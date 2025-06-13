
export interface HSLColorAdjustment {
  colorName: string; // e.g., 'Reds', 'Blues'
  hue: number;
  saturation: number;
  luminance: number;
}

export interface ToneCurvePoint {
  input: number;
  output: number;
}
export interface ToneCurveRGB {
  r: ToneCurvePoint[];
  g: ToneCurvePoint[];
  b: ToneCurvePoint[];
  all: ToneCurvePoint[]; // Combined/Luminance curve
}

export interface EditingParameters {
  temperature?: number;
  tint?: number;
  exposure?: number;
  contrast?: number;
  highlights?: number;
  shadows?: number;
  whites?: number;
  blacks?: number;
  texture?: number;
  clarity?: number;
  dehaze?: number;
  vibrance?: number;
  saturation?: number;
  hsl?: HSLColorAdjustment[];
  toneCurveRGB?: { 
    points: [number, number][]; 
  };
}

export enum SoftwareTarget {
  LIGHTROOM = "Lightroom",
  CAPCUT = "CapCut",
  PREMIERE_PRO = "Premiere Pro",
  AFTER_EFFECTS = "After Effects",
}

export interface UploadedImageInfo {
  file: File;
  dataUrl: string;
  name: string;
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web?: GroundingChunkWeb;
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
}

export interface Candidate {
  groundingMetadata?: GroundingMetadata;
}

export interface GeminiResponseData {
  text: string; 
  candidates?: Candidate[];
}

// New types for Theme and Language
export type Theme = 'light' | 'dark';
export type Language = 'en'; // Fixed to English

// Simplified Translations for fixed English
export interface Translations {
  [key: string]: string; // Only single level strings for fixed English
}

// For LanguageContext
export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void; // Will be a no-op
  translations: Translations;
}

// For ThemeContext
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}