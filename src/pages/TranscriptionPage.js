import React, { useState } from 'react';
import { AITranscribeButton } from '@/components/core/AITranscribeButton';

function TranscriptionPage() {
  const [transcriptions, setTranscriptions] = useState([]);
  
  // Handle new transcriptions
  const handleTranscriptionComplete = (text) => {
    const newTranscription = {
      id: Date.now(),
      text: text,
      date: new Date().toLocaleString()
    };
    
    setTranscriptions(prev => [newTranscription, ...prev]);
  };
  
  // Clear all transcriptions
  const clearTranscriptions = () => {
    setTranscriptions([]);
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Audio Transcription Tool</h1>
      
      <div className="mb-8">
        <AITranscribeButton 
          onTranscriptionComplete={handleTranscriptionComplete}
          buttonClassName="bg-blue-500 hover:bg-blue-600"
        />
      </div>
      
      {transcriptions.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Transcription History</h2>
            <button 
              onClick={clearTranscriptions}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear All
            </button>
          </div>
          
          <div className="space-y-4">
            {transcriptions.map(item => (
              <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                <p className="whitespace-pre-wrap">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TranscriptionPage;