export interface StreamState {
  playing: boolean;
  readableCurrentTime: string;
  readableDuration: string;
  duration: number | undefined;
  currentTrack: {
    currentTime: number | undefined;
    currentSrc: string;
    currentImage: string;
    currentTitle: string;
    currentUrl: string;
  };
  canplay: boolean;
  error: boolean;
}
