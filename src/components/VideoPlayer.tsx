import React, { useEffect, useState } from 'react';
import { useVideo } from '../contexts/VideoContext';
import { Loader2, AlertCircle } from 'lucide-react';

const VideoPlayer: React.FC = () => {
  const { video, rtsp, detectionMode } = useVideo();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ensure videoSrc is correctly set to the video URL
  const videoSrc = video.result || video.url || rtsp.streamUrl || null;
  const isProcessing = video.isProcessing || rtsp.isProcessing;

  useEffect(() => {
    setIsLoading(true);
    setError(null);
  }, [videoSrc]);

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setError('Failed to load video. Please try again.');
  };

  const getModeLabel = () => {
    switch (detectionMode) {
      case 'fall':
        return 'Fall Detection';
      case 'fire':
        return 'Fire/Smoke Detection';
      case 'violence':
        return 'Violence Detection';
      default:
        return 'Detection Mode Not Selected';
    }
  };

  return (
    <div className="relative">
      {isProcessing ? (
        <div className="aspect-video bg-gray-900 flex items-center justify-center">
          <div className="text-center p-6">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-xl font-medium text-white">Processing Video</p>
            <p className="text-gray-400 mt-2">Applying {getModeLabel()}...</p>
          </div>
        </div>
      ) : videoSrc ? (
        <>
          <div className="relative aspect-video bg-black">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
              </div>
            )}

            <video
              src={videoSrc}  // Ensure videoSrc is the correct video path
              className="w-full h-full object-contain"
              controls
              autoPlay
              onLoadedData={handleVideoLoaded}
              onError={handleVideoError}
            />

            <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white text-sm py-1 px-3 rounded-full">
              {getModeLabel()}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md mt-4 flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
        </>
      ) : (
        <div className="aspect-video bg-gray-900 flex items-center justify-center">
          <p className="text-gray-400">No video content to display</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
