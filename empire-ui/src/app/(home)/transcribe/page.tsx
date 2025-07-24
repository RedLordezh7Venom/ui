"use client";

import { useState } from "react";
import { AITranscribeButton } from "@/components/core/AITranscribeButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, FileAudio, Zap, CheckCircle, Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function TranscribePage() {
  const [transcriptionHistory, setTranscriptionHistory] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [qualityOption, setQualityOption] = useState<"standard" | "high">("standard");
  const [enableDiarization, setEnableDiarization] = useState(false);
  
  const handleTranscriptionComplete = (transcription: string) => {
    setTranscriptionHistory(prev => [transcription, ...prev.slice(0, 4)]); // Keep last 5 transcriptions
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full mr-3">
              <Mic className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
              AI Audio Transcription
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Transform your audio files into accurate text using advanced AI technology. 
            Upload any audio file and get instant, high-quality transcriptions.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Transcription Tool */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <FileAudio className="w-5 h-5 mr-2 text-primary" />
                  Upload & Transcribe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Select an audio file to get started. Supported formats include MP3, WAV, M4A, and more.
                  </div>
                  
                  {/* Transcription Options */}
                  <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">Transcription Options</h3>
                    
                    {/* Language Selection */}
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="language" className="text-sm">Language</Label>
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 mr-2 text-slate-500" />
                        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                          <SelectTrigger id="language" className="w-full">
                            <SelectValue placeholder="Select Language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="ja">Japanese</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Quality Option */}
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="quality" className="text-sm">Quality</Label>
                      <Select value={qualityOption} onValueChange={(val: "standard" | "high") => setQualityOption(val)}>
                        <SelectTrigger id="quality" className="w-full">
                          <SelectValue placeholder="Select Quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="high">High (Slower)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Speaker Diarization */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="diarization" className="text-sm">Speaker Identification</Label>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Identify different speakers in the audio</p>
                      </div>
                    </div>
                  
                    <AITranscribeButton 
                      onTranscriptionComplete={handleTranscriptionComplete}
                      className="w-full mt-4"
                      cardClassName="border-0 shadow-none bg-transparent"
                      maxFileSizeMB={50}
                      supportLongFiles={true}
                      qualityOptions={qualityOption}
                      language={selectedLanguage}
                      enableDiarization={enableDiarization}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features & Info */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">High Accuracy</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Powered by Groq's advanced speech recognition models
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">Multiple Formats</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Supports MP3, WAV, M4A, FLAC, AAC, OGG and more
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">Fast Processing</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Get your transcriptions in seconds, not minutes
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">Multi-language Support</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Transcribe audio in multiple languages with high accuracy
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">Speaker Identification</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Distinguish between different speakers in your audio
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">File Limits:</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Max 50MB</Badge>
                    <Badge variant="secondary">Long files supported</Badge>
                    <Badge variant="secondary">Multiple languages</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transcriptions */}
          {transcriptionHistory.length > 0 && (
            <Card className="mt-8 shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Recent Transcriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transcriptionHistory.map((transcription, index) => (
                    <div 
                      key={index} 
                      className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600"
                    >
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        Transcription #{transcriptionHistory.length - index}
                      </div>
                      <div className="text-slate-900 dark:text-slate-100 text-sm leading-relaxed">
                        {transcription.length > 200 
                          ? `${transcription.substring(0, 200)}...` 
                          : transcription
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}


