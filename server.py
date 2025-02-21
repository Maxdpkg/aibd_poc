import asyncio
import cv2
import torch
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import base64

app = FastAPI()

# 🔹 Autoriser les connexions WebSocket (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Remplace "*" par ["http://localhost:3000"] pour plus de sécurité
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 Charger le modèle YOLOv5
model = torch.hub.load('ultralytics/yolov5', 'yolov5s', source='github')  # Utilise le cache pour éviter un téléchargement

# 🔹 Ouvrir la webcam
cap = cv2.VideoCapture(0)  # 0 pour la webcam

# 🔹 Gestion des WebSockets
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                break

            # 🔹 Détection des objets avec YOLOv5
            results = model(frame)

            # 🔹 Convertir en liste d'alertes
            detections = []
            for *xyxy, conf, cls in results.xyxy[0]:  # xyxy: coords, conf: confiance, cls: classe
                detections.append({
                    "x_min": int(xyxy[0]),
                    "y_min": int(xyxy[1]),
                    "x_max": int(xyxy[2]),
                    "y_max": int(xyxy[3]),
                    "confidence": float(conf),
                    "class": int(cls)
                })

            # 🔹 Convertir l'image en base64 pour l'envoyer
            _, buffer = cv2.imencode('.jpg', frame)
            frame_base64 = base64.b64encode(buffer).decode("utf-8")

            # 🔹 Envoyer l'image et les détections au client
            await websocket.send_json({"frame": frame_base64, "detections": detections})

            await asyncio.sleep(0.05)  # Limiter la fréquence d'envoi

    except WebSocketDisconnect:
        print("WebSocket déconnecté")

# 🔹 Fermer la webcam à l'arrêt du serveur
@app.on_event("shutdown")
def shutdown():
    cap.release()
    cv2.destroyAllWindows()