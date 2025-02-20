"use client";
import React from "react";

import { useEffect, useState } from "react";

export default function Home() {
  const [frame, setFrame] = useState("");
  interface Detection {
    class: string;
    confidence: number;
  }

  const [detections, setDetections] = useState<Detection[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws"); // Remplace localhost

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setFrame(`data:image/jpeg;base64,${data.frame}`);
      setDetections(data.detections);
    };

    ws.onerror = (error) => console.error("WebSocket erreur :", error);

    return () => ws.close();
  }, []);

  return (
    <div>
      <h1>Détection d'objets</h1>
      {frame && <img src={frame} alt="Flux vidéo" style={{ width: "100%" }} />}
      <ul>
        {detections.map((det, index) => (
          <li key={index}>
            Objet {det.class} - Confiance: {Math.round(det.confidence * 100)}%
          </li>
        ))}
      </ul>
    </div>
  );
}
