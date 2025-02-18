import Sidebar from "./components/Sidebar";
import VideoCard from "./components/VideoCard";

const videos = [
  { title: "Cam 1", videoSrc: "/videos/test.mp4" },
  { title: "Cam 2", videoSrc: "/videos/video2.mp4" },
  { title: "Cam 3", videoSrc: "/videos/video3.mp4" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-5">
        <h1 className="text-3xl font-bold mb-4">Dashboard de Vidéosurveillance</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <VideoCard key={index} title={video.title} videoSrc={video.videoSrc} />
          ))}
        </div>
      </div>
    </div>
  );
}
