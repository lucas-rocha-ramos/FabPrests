import React, { useState, useCallback } from 'react';
import { EditingParameters, SoftwareTarget, UploadedImageInfo } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ImageUpload } from './components/ImageUpload';
import { ParameterDisplay } from './components/ParameterDisplay';
import { FormatSelector } from './components/FormatSelector';
import { DownloadControls } from './components/DownloadControls';
import { BeforeAfterPreview } from './components/PreviewDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { analyzeImageParameters } from './services/geminiService';
import { DEFAULT_EDITING_PARAMETERS } from './constants';
import { useTheme } from './hooks/useTheme';
import { useTranslations } from './hooks/useTranslations';


const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImageInfo | null>(null);
  const [editingParams, setEditingParams] = useState<EditingParameters | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SoftwareTarget>(SoftwareTarget.LIGHTROOM);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  const t = useTranslations();

  const handleImageUpload = useCallback(async (imageInfo: UploadedImageInfo) => {
    setUploadedImage(imageInfo);
    setEditingParams(null); // Reset previous params
    setError(null);
    setIsLoading(true);

    try {
      // IMPORTANT: The prompt to Gemini MUST remain in English to ensure consistent JSON structure.
      // UI text is translated, but the AI's instruction format is critical.
      const prompt = `Analyze an uploaded image and estimate the editing parameters applied. The image is a ${imageInfo.file.type} named ${imageInfo.name}.
      Provide these parameters as a JSON object. The JSON object should include keys for:
      "temperature" (number, e.g., 5500, range 2000-15000),
      "tint" (number, e.g., 10, range -150 to 150),
      "exposure" (number, e.g., 0.5, range -5.0 to 5.0),
      "contrast" (number, e.g., 20, range -100 to 100),
      "highlights" (number, e.g., -30, range -100 to 100),
      "shadows" (number, e.g., 25, range -100 to 100),
      "whites" (number, e.g., 15, range -100 to 100),
      "blacks" (number, e.g., -10, range -100 to 100),
      "texture" (number, e.g., 5, range -100 to 100),
      "clarity" (number, e.g., 10, range -100 to 100),
      "dehaze" (number, e.g., 5, range -100 to 100),
      "vibrance" (number, e.g., 15, range -100 to 100),
      "saturation" (number, e.g., 5, range -100 to 100).
      For HSL, include an array "hsl" with objects having "colorName" (string from ['Reds', 'Oranges', 'Yellows', 'Greens', 'Aquas', 'Blues', 'Purples', 'Magentas']), "hue" (number, -100 to 100), "saturation" (number, -100 to 100), "luminance" (number, -100 to 100). Provide 3-5 HSL adjustments for common colors.
      For "toneCurveRGB", provide an object with a "points" key, being an array of 3-5 [input, output] pairs (numbers 0-255), e.g., [[0,0], [64,80], [128,128], [192,180], [255,255]].
      Invent plausible values for a well-edited image. Do not include any explanations, just the JSON object.
      Example HSL: [{"colorName": "Blues", "hue": -10, "saturation": 15, "luminance": -5}].
      Ensure the entire output is a single, valid JSON object.`;
      
      const params = await analyzeImageParameters(prompt);
      setEditingParams(params);
    } catch (err) {
      console.error("Error analyzing image:", err);
      const errorMessage = err instanceof Error ? err.message : t('errorUnknownAnalysis');
      setError(errorMessage);
      setEditingParams(DEFAULT_EDITING_PARAMETERS); 
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const handleParametersChange = useCallback((newParams: EditingParameters) => {
    setEditingParams(newParams);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-gray-100' : 'bg-gradient-to-br from-gray-100 via-slate-50 to-gray-100 text-gray-800'}`}>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <ImageUpload onImageUpload={handleImageUpload} isLoading={isLoading} />

          {isLoading && <LoadingSpinner message={t('loadingAnalysis')} />}
          {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

          {uploadedImage && !isLoading && editingParams && (
            <div className="space-y-8">
              <BeforeAfterPreview 
                originalImageUrl={uploadedImage.dataUrl} 
                imageName={uploadedImage.name}
                editingParams={editingParams} 
              />
              
              <div className={`space-y-6 p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                <h2 className={`text-2xl font-semibold pb-2 border-b ${theme === 'dark' ? 'text-teal-400 border-gray-700' : 'text-teal-600 border-gray-300'}`}>{t('detectedParametersTitle')}</h2>
                <ParameterDisplay parameters={editingParams} onParametersChange={handleParametersChange} />
                <FormatSelector selectedFormat={selectedFormat} onFormatChange={setSelectedFormat} />
                <DownloadControls
                  parameters={editingParams}
                  selectedFormat={selectedFormat}
                  imageName={uploadedImage.name}
                />
              </div>
            </div>
          )}
           {uploadedImage && !isLoading && !editingParams && !error && (
             <p className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t('waitingAnalysis')}</p>
           )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;