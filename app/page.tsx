"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import VideoCard from "./components/VideoCard";
import AirportMap from "./components/AirportMap";

type Video = {
  id: number;
  title: string;
  videoSrc: string;
};

const videos: Video[] = [
  { id: 1, title: "Caméra 1", videoSrc: "/videos/test.mp4" },
  { id: 2, title: "Caméra 2", videoSrc: "/videos/test2.mp4" },
  { id: 3, title: "Caméra 3", videoSrc: "/videos/test3.mp4" },
];

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<Video>(videos[0]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-5">
        <h1 className="text-3xl font-bold mb-4">Dashboard de Vidéosurveillance</h1>

        {/* Grand affichage de la vidéo sélectionnée */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
          <video key={selectedVideo.id} className="w-full rounded-lg" controls loop autoPlay>
            <source src={selectedVideo.videoSrc} type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
          <h2 className="mt-2 text-xl font-semibold">{selectedVideo.title}</h2>
        </div>

        {/* Plan de l'aéroport */}
        <AirportMap setSelectedVideo={setSelectedVideo} />

        {/* Liste des vidéos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
