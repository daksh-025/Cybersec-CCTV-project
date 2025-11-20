import React, { createContext, useContext, useState } from 'react';
import { DetectionMode, VideoState, RtspState } from '../types';

interface VideoContextType {
  video: VideoState;
  rtsp: RtspState;
  detectionMode: DetectionMode;
  setVideo: React.Dispatch<React.SetStateAction<VideoState>>;
  setRtsp: React.Dispatch<React.SetStateAction<RtspState>>;
  setDetectionMode: React.Dispatch<React.SetStateAction<DetectionMode>>;
  resetVideo: () => void;
  resetRtsp: () => void;
}

const initialVideoState: VideoState = {
  file: null,
  url: null,
  isProcessing: false,
  result: null,
  error: null,
};

const initialRtspState: RtspState = {
  url: '',
  isConnected: false,
  isProcessing: false,
  error: null,
  streamUrl: null,
};

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [video, setVideo] = useState<VideoState>(initialVideoState);
  const [rtsp, setRtsp] = useState<RtspState>(initialRtspState);
  const [detectionMode, setDetectionMode] = useState<DetectionMode>(null);

  const resetVideo = () => {
    if (video.url) {
      URL.revokeObjectURL(video.url);
    }
    setVideo(initialVideoState);
  };

  const resetRtsp = () => {
    setRtsp(initialRtspState);
  };

  return (
    <VideoContext.Provider
      value={{
        video,
        rtsp,
        detectionMode,
        setVideo,
        setRtsp,
        setDetectionMode,
        resetVideo,
        resetRtsp,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = (): VideoContextType => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};