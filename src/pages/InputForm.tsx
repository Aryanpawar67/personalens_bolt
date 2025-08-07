import React, { useState, useRef } from 'react';
import { Upload, User, Building, FileText, Send, Loader, Brain, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData(prev => ({ ...prev, pdfFile: file }));
    setPdfExtracting(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

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
        setUploadProgress(100);
      } else {
        throw new Error('Backend extraction failed');
      }
    } catch (error) {
      console.log('Backend extraction failed, using PDF.js fallback');
      // Fallback: Use PDF.js in browser
      try {
        const text = await extractTextWithPdfJs(file);
        setFormData(prev => ({ ...prev, extractedPdfText: text }));
        setUploadProgress(100);
      } catch (fallbackError) {
        console.error('PDF extraction failed:', fallbackError);
        setValidationErrors(['Failed to extract text from PDF. Please try again.']);
      }
    } finally {
      clearInterval(progressInterval);
      setPdfExtracting(false);
    }
  };

  const extractTextWithPdfJs = async (file: File): Promise<string> => {
    // PDF.js fallback implementation would go here
    return new Promise((resolve) => {
      setTimeout(() => resolve('Extracted text from PDF.js fallback'), 1000);
    });
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    
    if (!formData.clientName.trim()) {
      errors.push('Client name is required');
    }
    
    if (!formData.icp.trim()) {
      errors.push('ICP (Ideal Customer Profile) is required');
    }
    
    if (!formData.callTranscripts.trim() && !formData.emailChains.trim() && !formData.extractedPdfText.trim()) {
      errors.push('At least one input source is required (call transcripts, email chains, or PDF)');
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
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
      setValidationErrors(['Analysis failed. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const getCharacterCount = (text: string) => text.length;
  const getWordCount = (text: string) => text.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="min-h-screen pt-20 px-6 pb-12 neural-grid">
      <div className="max-w-5xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 glass-card rounded-full px-6 py-3 mb-6 group hover:scale-105 transition-all duration-300">
            <div className="relative">
              <Brain className="w-5 h-5 text-blue-400 animate-neural-pulse" />
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-sm opacity-30 animate-pulse" />
            </div>
            <span className="text-blue-300 font-semibold tracking-wide">AI PERSONALITY ANALYSIS</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          
          <h1 className="text-5xl font-black text-white mb-6">
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Analysis Input</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Provide client information for comprehensive personality analysis powered by advanced AI
          </p>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="glass-card rounded-2xl p-6 mb-8 border-red-500/30 bg-red-500/10">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <h3 className="text-red-400 font-semibold">Please fix the following errors:</h3>
            </div>
            <ul className="space-y-2">
              {validationErrors.map((error, index) => (
                <li key={index} className="text-red-300 flex items-center gap-2">
                  <div className="w-1 h-1 bg-red-400 rounded-full" />
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Enhanced Form */}
        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Client Name */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-white font-semibold text-lg">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
                Client Name
                <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                className="w-full glass-card rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                placeholder="Enter client's full name"
                required
              />
            </div>

            {/* ICP */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-white font-semibold text-lg">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                  <Building className="w-4 h-4 text-white" />
                </div>
                ICP (Ideal Customer Profile)
                <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="icp"
                value={formData.icp}
                onChange={handleInputChange}
                className="w-full glass-card rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                placeholder="Describe the ideal customer profile"
                required
              />
            </div>
          </div>

          {/* Call Transcripts */}
          <div className="mb-8 space-y-3">
            <label className="flex items-center gap-3 text-white font-semibold text-lg">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <FileText className="w-4 h-4 text-white" />
              </div>
              Call Transcripts
              <div className="ml-auto text-sm text-gray-400">
                {getWordCount(formData.callTranscripts)} words • {getCharacterCount(formData.callTranscripts)} characters
              </div>
            </label>
            <textarea
              name="callTranscripts"
              value={formData.callTranscripts}
              onChange={handleInputChange}
              rows={6}
              className="w-full glass-card rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all duration-300 resize-none"
              placeholder="Paste call transcripts here... Include all relevant conversation details for better analysis."
            />
          </div>

          {/* Email Chains */}
          <div className="mb-8 space-y-3">
            <label className="flex items-center gap-3 text-white font-semibold text-lg">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <FileText className="w-4 h-4 text-white" />
              </div>
              Email Chains
              <div className="ml-auto text-sm text-gray-400">
                {getWordCount(formData.emailChains)} words • {getCharacterCount(formData.emailChains)} characters
              </div>
            </label>
            <textarea
              name="emailChains"
              value={formData.emailChains}
              onChange={handleInputChange}
              rows={6}
              className="w-full glass-card rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 resize-none"
              placeholder="Paste email chains here... Include complete email threads for comprehensive analysis."
            />
          </div>

          {/* Enhanced PDF Upload */}
          <div className="mb-8 space-y-3">
            <label className="flex items-center gap-3 text-white font-semibold text-lg">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                <Upload className="w-4 h-4 text-white" />
              </div>
              PDF Upload (Optional)
            </label>
            <div 
              className="glass-card rounded-2xl p-8 text-center hover:border-blue-400/50 transition-all duration-300 cursor-pointer group"
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
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <Loader className="w-6 h-6 animate-spin text-blue-400" />
                    <span className="text-gray-300 font-medium">Extracting PDF text...</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-400">{uploadProgress}% complete</div>
                </div>
              ) : formData.pdfFile ? (
                <div className="space-y-3">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
                  <div className="text-green-400 font-semibold text-lg">
                    ✓ {formData.pdfFile.name}
                  </div>
                  <div className="text-gray-300">
                    {formData.extractedPdfText.length} characters extracted
                  </div>
                </div>
              ) : (
                <div className="space-y-4 group-hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto group-hover:text-blue-400 transition-colors" />
                    <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-lg font-medium mb-2">Click to upload PDF or drag and drop</p>
                    <p className="text-gray-500">PDF files only • Max 10MB</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formData.clientName || !formData.icp}
            className="w-full relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-600 disabled:to-gray-600 text-white py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-4 group interactive-hover"
          >
            {isLoading ? (
              <>
                <Loader className="w-6 h-6 animate-spin" />
                <span>Analyzing with AI...</span>
                <div className="flex gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <Brain className="w-6 h-6 group-hover:animate-pulse" />
                <span>Start AI Analysis</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Progress Indicator */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="text-sm text-gray-400">Powered by</div>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-semibold">Advanced AI Models</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};