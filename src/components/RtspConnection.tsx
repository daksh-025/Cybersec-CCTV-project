import React, { useState } from 'react';
import { useVideo } from '../contexts/VideoContext';
import { connectToRtsp } from '../services/api';
import { Video, Loader2 } from 'lucide-react';

const RtspConnection: React.FC = () => {
  const { rtsp, setRtsp, detectionMode, video } = useVideo();
  const [rtspUrl, setRtspUrl] = useState('');

  const isVideoUploaded = video.file !== null;
  
  const handleConnect = async () => {
    if (!rtspUrl.trim()) {
      setRtsp({
        ...rtsp,
        error: 'Please enter a valid RTSP URL',
      });
      return;
    }
    
    if (!detectionMode) {
      setRtsp({
        ...rtsp,
        error: 'Please select a detection mode',
      });
      return;
    }
    
    setRtsp({
      ...rtsp,
      isProcessing: true,
      error: null,
    });
    
    try {
      const streamUrl = await connectToRtsp(rtspUrl, detectionMode);
      setRtsp({
        url: rtspUrl,
        isConnected: true,
        isProcessing: false,
        error: null,
        streamUrl,
      });
    } catch (error) {
      setRtsp({
        ...rtsp,
        isProcessing: false,
        error: error instanceof Error ? error.message : 'Failed to connect to RTSP stream',
      });
    }
  };
  
  const handleDisconnect = () => {
    setRtsp({
      url: '',
      isConnected: false,
      isProcessing: false,
      error: null,
    });
  };
  
  return (
    <div className="space-y-4">
      {!rtsp.isConnected ? (
        <>
          <div className="space-y-2">
            <label htmlFor="rtspUrl" className="block text-sm font-medium">
              RTSP Stream URL
            </label>
            <input
              type="text"
              id="rtspUrl"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              placeholder="rtsp://username:password@ip:port/stream"
              value={rtspUrl}
              onChange={(e) => setRtspUrl(e.target.value)}
              disabled={rtsp.isProcessing || isVideoUploaded}
            />
          </div>
          
          <button
            onClick={handleConnect}
            disabled={rtsp.isProcessing || !rtspUrl.trim() || !detectionMode || isVideoUploaded}
            className={`w-full px-4 py-2 flex items-center justify-center rounded-md text-white transition-colors ${
              rtsp.isProcessing || !rtspUrl.trim() || !detectionMode || isVideoUploaded
                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {rtsp.isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Video className="w-5 h-5 mr-2" />
                Connect
              </>
            )}
          </button>
          
          {rtsp.error && (
            <p className="text-sm text-red-500 mt-2">{rtsp.error}</p>
          )}
          
          {isVideoUploaded && (
            <p className="text-sm text-amber-600 dark:text-amber-400 italic mt-2">
              Remove uploaded video to connect to RTSP stream
            </p>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md">
            <Video className="w-5 h-5 text-green-500" />
            <div className="flex-1 truncate">
              <p className="text-sm font-medium truncate">{rtsp.url}</p>
              <p className="text-xs text-green-500">Connected</p>
            </div>
          </div>
          
          <button
            onClick={handleDisconnect}
            className="w-full px-4 py-2 flex items-center justify-center rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default RtspConnection;