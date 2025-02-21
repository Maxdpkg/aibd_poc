from fastapi import FastAPI, File, UploadFile
import cv2
import numpy as np
import base64
from ultralytics import YOLO

app = FastAPI()
model = YOLO("yolov8n.pt")  # Assurez-vous d'avoir YOLOv8 installé

@app.post("/detect")
async def detect_objects(data: dict):
    image_data = data["image"].split(",")[1]  # Extraire base64
    nparr = np.frombuffer(base64.b64decode(image_data), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    results = model(img)
    detections = [det.cls for det in results[0].boxes]

    return {"message": f"Objets détectés : {detections}"}
