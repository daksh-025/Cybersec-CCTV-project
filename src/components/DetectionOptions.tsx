import React from 'react';
import { useVideo } from '../contexts/VideoContext';
import { DetectionMode } from '../types';
import { AlertTriangle, Flame, PersonStanding } from 'lucide-react';

const DetectionOptions: React.FC = () => {
  const { detectionMode, setDetectionMode, video, rtsp } = useVideo();
  
  const isProcessing = video.isProcessing || rtsp.isProcessing;

  const detectionOptions = [
    {
      mode: 'fall' as DetectionMode,
      label: 'Fall Detection',
      icon: <PersonStanding className="w-5 h-5" />,
      description: 'Detect falls and potential injuries',
      accentColor: 'border-blue-500 dark:border-blue-400',
      bgColor: 'bg-blue-500',
      hoverBg: 'hover:bg-blue-100 dark:hover:bg-blue-900/30',
    },
    {
      mode: 'fire' as DetectionMode,
      label: 'Fire/Smoke',
      icon: <Flame className="w-5 h-5" />,
      description: 'Detect fire and smoke hazards',
      accentColor: 'border-orange-500 dark:border-orange-400',
      bgColor: 'bg-orange-500',
      hoverBg: 'hover:bg-orange-100 dark:hover:bg-orange-900/30',
    },
    {
      mode: 'violence' as DetectionMode,
      label: 'Violence',
      icon: <AlertTriangle className="w-5 h-5" />,
      description: 'Detect violent actions and threats',
      accentColor: 'border-red-500 dark:border-red-400',
      bgColor: 'bg-red-500',
      hoverBg: 'hover:bg-red-100 dark:hover:bg-red-900/30',
    },
  ];

  return (
    <div className="space-y-3">
      {detectionOptions.map((option) => (
        <div
          key={option.mode}
          className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
            detectionMode === option.mode
              ? `${option.accentColor} ${option.hoverBg}`
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
          onClick={() => !isProcessing && setDetectionMode(option.mode)}
        >
          <div className="flex items-center space-x-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${option.bgColor} bg-opacity-10 dark:bg-opacity-20 text-${option.bgColor.split('-')[1]}-500`}>
              {option.icon}
            </div>
            <div>
              <h3 className="font-medium">{option.label}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {option.description}
              </p>
            </div>
          </div>
          {detectionMode === option.mode && (
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-blue-500"></div>
          )}
        </div>
      ))}
      {isProcessing && (
        <p className="text-sm text-amber-600 dark:text-amber-400 italic mt-2">
          Detection mode cannot be changed during processing
        </p>
      )}
    </div>
  );
};

export default DetectionOptions;