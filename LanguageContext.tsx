

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations, LanguageContextType } from '../types';
import { DEFAULT_LANGUAGE } from '../constants';

// THIS FILE HAS BEEN MODIFIED TO REMOVE DYNAMIC LANGUAGE LOADING
// AND FIX THE LANGUAGE TO ENGLISH TO PREVENT THE MODULE RESOLUTION ERROR.
// THE ERROR "Failed to resolve module specifier '@/locales/en.json'"
// WAS DUE TO BROWSER CACHING AN OLD VERSION OF THIS FILE.
// THIS VERSION NO LONGER ATTEMPTS TO LOAD `../locales/en.json` or `../locales/pt.json`.

const hardcodedEnglishTranslations: Translations = {
  "appTitleAI": "AI Preset",
  "appTitleConverter": " & LUT Converter",
  "switchToLightMode": "Switch to Light Mode",
  "switchToDarkMode": "Switch to Dark Mode",
  "viewOnGitHub": "View on GitHub",
  "uploadTitle": "1. Upload Your Edited Image",
  "uploadClick": "Click to upload",
  "uploadOrDrag": "or drag and drop",
  "uploadFormats": "JPG or PNG (MAX. {{size}}MB)",
  "uploadNote": "The AI will analyze the visual characteristics of your uploaded image. RAW files are not currently supported.",
  "errorInvalidFileType": "Invalid file type. Please upload JPG or PNG images.",
  "errorFileSize": "File is too large. Maximum size is {{size}}MB.",
  "errorReadFile": "Could not read file.",
  "errorReadingFile": "Error reading file.",
  "loadingAnalysis": "AI is analyzing your image...",
  "errorPrefix": "Error:",
  "closeButtonLabel": "Close",
  "previewTitle": "Image Preview",
  "previewOriginal": "Original",
  "previewSimulated": "Simulated Effect",
  "previewNote": "Effect simulated with CSS filters. Actual preset/LUT may vary.",
  "detectedParametersTitle": "2. Detected Editing Parameters",
  "paramBasicAdjustments": "Basic Adjustments",
  "paramTemperature": "Temperature",
  "paramTint": "Tint",
  "paramExposure": "Exposure",
  "paramContrast": "Contrast",
  "paramHighlights": "Highlights",
  "paramShadows": "Shadows",
  "paramWhites": "Whites",
  "paramBlacks": "Blacks",
  "paramPresence": "Presence",
  "paramTexture": "Texture",
  "paramClarity": "Clarity",
  "paramDehaze": "Dehaze",
  "paramColor": "Color",
  "paramVibrance": "Vibrance",
  "paramSaturation": "Saturation",
  "paramHSLAdjustments": "HSL Adjustments",
  "paramHue": "Hue",
  "paramLuminance": "Luminance",
  "colorReds": "Reds",
  "colorOranges": "Oranges",
  "colorYellows": "Yellows",
  "colorGreens": "Greens",
  "colorAquas": "Aquas",
  "colorBlues": "Blues",
  "colorPurples": "Purples",
  "colorMagentas": "Magentas",
  "paramToneCurve": "Tone Curve (RGB - Simplified)",
  "paramPoints": "Points",
  "paramToneCurveNote": "Tone curve editing is complex; values are shown as detected. Advanced editing UI for curves is not yet implemented.",
  "formatSelectorTitle": "3. Select Output Format",
  "downloadTitle": "4. Download Your File",
  "downloadButton": "Download {{format}} ({{extension}})",
  "downloadNote": "Note: Generated files are simplified versions for demonstration purposes.",
  "footerCopyright": "AI Image Preset & LUT Converter",
  "footerPoweredBy": "Powered by Lucas Rocha Fotografias.",
  "footerNote": "Note: AI analysis simula as edições, podendo nao ser 100% dependendo da qualidade da imagem.",
  "waitingAnalysis": "Waiting for analysis results to display preview and controls...",
  "errorUnknownAnalysis": "An unknown error occurred during analysis. Using default parameters.",
  "cubeTitle": "Generated LUT: {{name}}",
  "cubeComment": "Created by AI Image Preset & LUT Converter",
  "cubeNote": "This is a simplified LUT for demonstration. Effects may not be fully applied.",
  "styleWarm": "Warm",
  "styleCool": "Cool",
  "styleBright": "Bright",
  "styleDark": "Dark",
  "styleMoody": "Moody",
  "stylePunchy": "Punchy",
  "styleSoft": "Soft",
  "styleVibrant": "Vibrant",
  "styleMuted": "Muted",
  "styleTealOrange": "TealOrange",
  "styleCustomEdit": "CustomEdit"
};


export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Language is now fixed to English
  const language: Language = DEFAULT_LANGUAGE; // DEFAULT_LANGUAGE is 'en'
  const translations: Translations = hardcodedEnglishTranslations;

  useEffect(() => {
    // Persist fixed language choice if desired, though not strictly necessary for fixed lang
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language); 
  }, [language]);

  // setLanguage is now a no-op as language is fixed
  const setLanguage = (newLanguage: Language) => {
    console.warn("Language switching is disabled. Site is fixed to English.", newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
