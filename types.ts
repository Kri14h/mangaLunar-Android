export interface MangaItem {
  id: string;
  title: string;
  coverUrl: string;
  pages: string[]; // Blob URLs
}

export type ViewMode = 'library' | 'reader';

export interface LibraryItem {
  id: string;
  title: string;
  path: string; // Permanent storage path (FileSystem)
  coverUrl?: string; // Base64 or local URI
}

export interface SpeechBubble {
  text: string;
  box_2d: [number, number, number, number]; // [xmin, ymin, xmax, ymax] (actual pixels)
}

export interface PageAnalysis {
  bubbles: SpeechBubble[];
  status: 'loading' | 'complete' | 'error';
  errorMsg?: string;
}

export interface OCRCache {
  [pageIndex: number]: PageAnalysis;
}

export interface UserSettings {
  ttsSpeed: number;
}