import React from 'react';
import Header from './Header';
import VideoUpload from './VideoUpload';
import DetectionOptions from './DetectionOptions';
import RtspConnection from './RtspConnection';
import VideoPlayer from './VideoPlayer';
import { useVideo } from '../contexts/VideoContext';

const Dashboard: React.FC = () => {
  const { video, rtsp } = useVideo();
  
  const hasVideoContent = video.url || (rtsp.isConnected && rtsp.url);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              {hasVideoContent ? (
                <VideoPlayer />
              ) : (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Video Analysis</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Upload a video or connect to an RTSP stream to begin analysis with your selected detection mode.
                  </p>
                  <VideoUpload />
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Detection Options</h2>
              <DetectionOptions />
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">RTSP Connection</h2>
              <RtspConnection />
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Video Analysis Platform © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;