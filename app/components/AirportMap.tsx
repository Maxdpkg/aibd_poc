"use client";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setSelectedVideo: Dispatch<SetStateAction<Video>>;
};

type Video = {
  id: number;
  title: string;
  x: string;
  y: string;
  videoSrc: string;
};

const cameras: Video[] = [
  { id: 1, title: "Caméra 1", x: "20%", y: "30%", videoSrc: "/videos/test.mp4" },
  { id: 2, title: "Caméra 2", x: "50%", y: "50%", videoSrc: "/videos/test2.mp4" },
  { id: 3, title: "Caméra 3", x: "70%", y: "20%", videoSrc: "/videos/test3.mp4" },
];

export default function AirportMap({ setSelectedVideo }: { setSelectedVideo: (video: Video) => void }) {
  return (
    <div className="relative bg-blue-50 p-4 rounded-lg shadow-lg h-[250px]">
      <img src="/image.png" alt="Plan de l'aéroport" className="w-full h-full object-cover rounded-lg" />

      {/* Points des caméras */}
      {cameras.map((camera) => (
        <button
          key={camera.id}
          className="absolute bg-red-500 text-white rounded-full p-2 text-sm flex items-center justify-center"
          style={{ top: camera.y, left: camera.x, width: "30px", height: "30px" }}
          onClick={() => setSelectedVideo(camera)}
        >
          {camera.id}
        </button>
      ))}
    </div>
  );
}
