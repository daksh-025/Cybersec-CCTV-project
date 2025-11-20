import React, { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useVideo } from '../contexts/VideoContext';
import { uploadVideo } from '../services/api';

const VideoUpload: React.FC = () => {
  const { video, setVideo, resetVideo, detectionMode } = useVideo();
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback(
    async (file: File | null) => {
      if (file) {
        // Create a preview URL for the video
        const previewUrl = URL.createObjectURL(file);
        
        setVideo({
          ...video,
          file,
          url: previewUrl,
          error: null,
        });

        if (detectionMode) {
          setVideo(prev => ({ ...prev, isProcessing: true }));
          try {
            const processedVideoUrl = await uploadVideo(file, detectionMode);
            setVideo(prev => ({
              ...prev,
              isProcessing: false,
              result: processedVideoUrl,
            }));
          } catch (error) {
            setVideo(prev => ({
              ...prev,
              isProcessing: false,
              error: error instanceof Error ? error.message : 'Failed to process video',
            }));
          }
        }
      }
    },
    [video, setVideo, detectionMode]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        
        // Check if the file is a video
        if (!file.type.startsWith('video/')) {
          setVideo({
            ...video,
            error: 'Please upload a valid video file.',
          });
          return;
        }
        
        handleFileChange(file);
      }
    },
    [handleFileChange, video, setVideo]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        
        // Check if the file is a video
        if (!file.type.startsWith('video/')) {
          setVideo({
            ...video,
            error: 'Please upload a valid video file.',
          });
          return;
        }
        
        handleFileChange(file);
      }
    },
    [handleFileChange, video, setVideo]
  );

  const handleRemoveVideo = useCallback(() => {
    resetVideo();
  }, [resetVideo]);

  return (
    <div className="w-full">
      {!video.file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10'
              : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50'
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-3" />
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Drag and drop a video file here, or click to select
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Supports MP4, AVI, MOV, and WebM formats
          </p>
          <input
            type="file"
            id="videoInput"
            className="hidden"
            accept="video/*"
            onChange={handleFileInputChange}
          />
          <button
            type="button"
            onClick={() => document.getElementById('videoInput')?.click()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Select Video
          </button>
          {video.error && (
            <p className="mt-3 text-red-500 text-sm">{video.error}</p>
          )}
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-md flex items-center justify-center">
                <Upload className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="truncate">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                  {video.file.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(video.file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveVideo}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="relative aspect-video bg-black rounded-md overflow-hidden">
            {video.url && (
              <video
                src={video.url}
                className="w-full h-full object-contain"
                controls
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;