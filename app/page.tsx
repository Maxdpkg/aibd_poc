"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/NavBar";
import VideoCard from "./components/VideoCard";
import AirportMap from "./components/AirportMap";
import AlertList from "./components/AlertList";
import WebcamStream from "./components/WebcamStream"; 

type Video = {
  id: number;
  title: string;
  videoSrc: string;
  terminal: string;
};

const videos: Video[] = [
  { id: 1, title: "Cam 1", videoSrc: "/videos/test.mp4", terminal: "T1" },
  { id: 2, title: "Cam 2", videoSrc: "/videos/test2.mp4", terminal: "T2"},
  { id: 3, title: "Cam 3", videoSrc: "/videos/test3.mp4", terminal: "T3"},
];

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<Video>(videos[0]);
  const [alerts, setAlerts] = useState([
    { id: 1, message: "Mouvement suspect détecté", time: "10:30" },
    { id: 2, message: "Caméra 2 hors ligne", time: "10:45" },
  ]);

  // Simulation d'ajout d'alertes toutes les 10 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts((prev) => [
        { id: prev.length + 1, message: "Nouvelle alerte détectée", time: new Date().toLocaleTimeString() },
        ...prev.slice(0, 4), // Garder uniquement les 5 dernières alertes
      ]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-black">
      <Navbar />
      
      <div className="pt-20 p-5 mt-50">
        <h1 className="text-3xl font-bold mb-4 mt-20">Dashboard de Vidéosurveillance</h1>

        {/* Section vidéo + carte + alertes */}
        <div className="flex gap-4">
          {/* Grand affichage de la vidéo */}
          <div className="w-2/3 bg-blue-50 p-4 rounded-lg shadow-lg">
            <video key={selectedVideo.id} className="w-full rounded-lg" autoPlay loop muted>
              <source src={selectedVideo.videoSrc} type="video/mp4" />
              Votre navigateur ne supporte pas la vidéo.
            </video>
            <h2 className="mt-2 text-xl font-semibold">{selectedVideo.title}</h2>
          </div>


          {/* Plan de l'aéroport + alertes */}
          <div className="w-1/3 flex flex-col space-y-4">
            <AirportMap setSelectedVideo={setSelectedVideo} />
            <AlertList alerts={alerts} />
          </div>
          <div className="w-2/3 bg-blue-50 p-4 rounded-lg shadow-lg">
            <WebcamStream />
          </div>
        </div>

        {/* Liste des vidéos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {videos.map((video) => (
            <div key={video.id} onClick={() => setSelectedVideo(video)}>
              <VideoCard title={video.title} videoSrc={video.videoSrc} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
