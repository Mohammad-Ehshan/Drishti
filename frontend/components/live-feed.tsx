"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Video, VideoOff } from "lucide-react";

export function LiveFeedView() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cameraUrl, setCameraUrl] = useState(
    process.env.NEXT_PUBLIC_CAMERA_URL || "http://192.168.118.8:8080/video"
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
  }, [cameraUrl]);

  return (
    <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
      {isVisible && (
        <img
          src={cameraUrl}
          className="w-full h-full object-contain"
          alt="Live feed"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError("Failed to load video feed");
          }}
        />
      )}

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <RefreshCw className="animate-spin text-white" size={24} />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-4">
          <VideoOff className="text-white mb-2" size={24} />
          <p className="text-white text-center">{error}</p>
          <Button variant="secondary" className="mt-4" onClick={() => setIsVisible(true)}>
            Retry
          </Button>
        </div>
      )}

      <div className="absolute bottom-4 right-4">
        <Button
          size="icon"
          variant={isVisible ? "destructive" : "default"}
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {isVisible ? <VideoOff size={16} /> : <Video size={16} />}
        </Button>
      </div>
    </div>
  );
}
