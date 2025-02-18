type VideoCardProps = {
    title: string;
    videoSrc: string;
  };
  
  export default function VideoCard({ title, videoSrc }: VideoCardProps) {
    return (
      <div className="bg-gray-800 p-3 rounded-lg shadow-md">
        <video className="w-full rounded-lg" controls>
          <source src={videoSrc} type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
        <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      </div>
    );
  }
  