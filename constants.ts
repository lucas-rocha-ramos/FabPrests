
import { EditingParameters, Language, Theme } from './types';

export const GEMINI_TEXT_MODEL_NAME = "gemini-2.5-flash-preview-04-17";

export const DEFAULT_EDITING_PARAMETERS: EditingParameters = {
  temperature: 5500,
  tint: 10,
  exposure: 0.0,
  contrast: 0,
  highlights: 0,
  shadows: 0,
  whites: 0,
  blacks: 0,
  texture: 0,
  clarity: 0,
  dehaze: 0,
  vibrance: 0,
  saturation: 0,
  hsl: [
    { colorName: 'Reds', hue: 0, saturation: 0, luminance: 0 },
    { colorName: 'Greens', hue: 0, saturation: 0, luminance: 0 },
    { colorName: 'Blues', hue: 0, saturation: 0, luminance: 0 },
  ],
  toneCurveRGB: {
    points: [
      [0,0], 
      [128,128], 
      [255,255]
    ]
  }
};

export const DEFAULT_LANGUAGE: Language = 'en'; // Fixed to English
export const DEFAULT_THEME: Theme = 'dark';