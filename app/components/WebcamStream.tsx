"use client";

import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";

export default function WebcamStream() {
  const webcamRef = useRef<Webcam>(null);
  const [detection, setDetection] = useState<string>("Aucune détection");

  useEffect(() => {
    const sendFrameToServer = async () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          try {
            const response = await fetch("http://127.0.0.1:8000/detect", {
              method: "POST",
              body: JSON.stringify({ image: imageSrc }),
              headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            setDetection(data.message);
          } catch (error) {
            console.error("Erreur lors de la détection :", error);
          }
        }
      }
    };

    const interval = setInterval(sendFrameToServer, 1000); // Envoi toutes les secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded-lg shadow-lg"
      />
      <p className="mt-4 text-lg font-semibold">{detection}</p>
    </div>
  );
}
