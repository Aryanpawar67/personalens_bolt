import React, { useState, useRef } from 'react';
import { Upload, User, Building, FileText, Send, Loader, Brain } from 'lucide-react';

interface FormData {
  clientName: string;
  icp: string;
  callTranscripts: string;
  emailChains: string;
  pdfFile: File | null;
  extractedPdfText: string;
}

export const InputForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    icp: '',
    callTranscripts: '',
    emailChains: '',
    pdfFile: null,
    extractedPdfText: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [pdfExtracting, setPdfExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData(prev => ({ ...prev, pdfFile: file }));
    setPdfExtracting(true);

    try {
      // Primary: Send to backend for extraction
      const formDataForUpload = new FormData();
      formDataForUpload.append('pdf', file);
      
      const response = await fetch('/api/extract-pdf-text', {
        method: 'POST',
        body: formDataForUpload
      });

      if (response.ok) {
        const { text } = await response.json();
        setFormData(prev => ({ ...prev, extractedPdfText: text }));
      } else {
        throw new Error('Backend extraction failed');
      }
    } catch (error) {
      console.log('Backend extraction failed, using PDF.js fallback');
      // Fallback: Use PDF.js in browser
      try {
        const text = await extractTextWithPdfJs(file);
        setFormData(prev => ({ ...prev, extractedPdfText: text }));
      } catch (fallbackError) {
        console.error('PDF extraction failed:', fallbackError);
      }
    } finally {
      setPdfExtracting(false);
    }
  };

  const extractTextWithPdfJs = async (file: File): Promise<string> => {
    // PDF.js fallback implementation would go here
    return new Promise((resolve) => {
      setTimeout(() => resolve('Extracted text from PDF.js fallback'), 1000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const analysisData = {
        clientName: formData.clientName,
        icp: formData.icp,
        callTranscripts: formData.callTranscripts,
        emailChains: formData.emailChains,
        extractedPdfText: formData.extractedPdfText
      };

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(analysisData)
      });

      if (response.ok) {
        const result = await response.json();
        // Navigate to dashboard with results
        window.location.href = `/dashboard?data=${encodeURIComponent(JSON.stringify(result))}`;
      } else {
        throw new Error('Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-6 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">AI ANALYSIS</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Analysis Input</span>
          </h1>
          <p className="text-xl text-gray-300">
            Provide client information for comprehensive personality analysis
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Client Name */}
            <div>
              <label className="flex items-center gap-2 text-white font-medium mb-3">
                <User className="w-4 h-4" />
                Client Name
              </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                placeholder="Enter client name"
                required
              />
            </div>

            {/* ICP */}
            <div>
              <label className="flex items-center gap-2 text-white font-medium mb-3">
                <Building className="w-4 h-4" />
                ICP (Ideal Customer Profile)
              </label>
              <input
                type="text"
                name="icp"
                value={formData.icp}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                placeholder="Enter ICP details"
                required
              />
            </div>
          </div>

          {/* Call Transcripts */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-white font-medium mb-3">
              <FileText className="w-4 h-4" />
              Call Transcripts
            </label>
            <textarea
              name="callTranscripts"
              value={formData.callTranscripts}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors resize-none"
              placeholder="Paste call transcripts here..."
            />
          </div>

          {/* Email Chains */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-white font-medium mb-3">
              <FileText className="w-4 h-4" />
              Email Chains
            </label>
            <textarea
              name="emailChains"
              value={formData.emailChains}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors resize-none"
              placeholder="Paste email chains here..."
            />
          </div>

          {/* PDF Upload */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-white font-medium mb-3">
              <Upload className="w-4 h-4" />
              PDF Upload (Optional)
            </label>
            <div 
              className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handlePdfUpload}
                className="hidden"
              />
              {pdfExtracting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader className="w-5 h-5 animate-spin text-purple-400" />
                  <span className="text-gray-300">Extracting PDF text...</span>
                </div>
              ) : formData.pdfFile ? (
                <div className="text-green-400">
                  ✓ {formData.pdfFile.name} uploaded
                </div>
              ) : (
                <div>
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-300">Click to upload PDF or drag and drop</p>
                  <p className="text-gray-500 text-sm mt-1">PDF files only</p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formData.clientName || !formData.icp}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Start Analysis
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};