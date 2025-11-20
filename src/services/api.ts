import { DetectionMode } from '../types';

const API_URL = 'http://localhost:5000/api'; 

export const uploadVideo = async (file: File, detectionMode: DetectionMode): Promise<string> => {
  const formData = new FormData();
  formData.append('video', file);
  formData.append('mode', detectionMode || 'fall');

  try {
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to process video');
    }

    // Return the URL of the processed video
    return `${API_URL}${data.url}`;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw new Error('Failed to upload video.');
  }
};

export const connectToRtsp = async (rtspUrl: string, detectionMode: DetectionMode): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/rtsp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: rtspUrl,
        mode: detectionMode,
      }),
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to connect to RTSP stream');
    }

    // Return the URL of the processed stream
    console.log(data.url)
    return `http://localhost:5000${data.url}`;
  } catch (error) {
    console.error('Error connecting to RTSP:', error);
    throw new Error('Failed to connect to RTSP stream.');
  }
};