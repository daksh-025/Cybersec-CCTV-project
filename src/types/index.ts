export type DetectionMode = 'fall' | 'fire' | 'violence' | null;

export interface VideoState {
  file: File | null;
  url: string | null;
  isProcessing: boolean;
  result: string | null;
  error: string | null;
}

export interface RtspState {
  url: string;
  isConnected: boolean;
  isProcessing: boolean;
  error: string | null;
  streamUrl?: string | null;
}

export interface ApiResponse {
  success: boolean;
  url?: string;
  error?: string;
}