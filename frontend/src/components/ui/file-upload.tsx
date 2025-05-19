
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CloudUpload, FileText, Loader2, CheckCircle, XCircle } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onAnalyze: () => void;
  reportType: string;
  isLoading: boolean;
}

export const FileUpload = ({
  onFileSelect,
  onAnalyze,
  reportType,
  isLoading,
}: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (selectedFile: File): boolean => {
    // Check file type (accept PDFs)
    if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setFileError("Please select a PDF file");
      return false;
    }

    // Check file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setFileError("File is too large (max 10MB)");
      return false;
    }

    setFileError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        onFileSelect(selectedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        onFileSelect(selectedFile);
      }
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
    setFileError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const getIconForReportType = () => {
    switch(reportType) {
      case "Heart Health":
        return "❤️";
      case "Body Composition":
        return "👤";
      case "Blood Analysis":
        return "🩸";
      case "Skin Health":
        return "✨";
      case "Wellbeing & Stress":
        return "🧠";
      case "Hormone Profile":
        return "⚗️";
      case "Physical Fitness":
        return "💪";
      case "DNA & Nutrition":
        return "🧬";
      default:
        return "📄";
    }
  };

  return (
    <Card className="bg-white shadow-md border border-gray-200">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">{getIconForReportType()}</div>
          <h2 className="text-2xl font-bold text-health-blue-dark">{reportType} Report Analysis</h2>
          <p className="text-gray-600 mt-2">
            Upload your {reportType} PDF report to analyze key metrics and visualize your health data
          </p>
        </div>
        
        <div
          className={`relative border-2 ${
            dragActive ? "border-health-blue bg-blue-50" : "border-dashed border-gray-300"
          } rounded-lg p-8 transition-all ${
            fileError ? "border-red-300 bg-red-50" : ""
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf"
          />
          
          <div className="flex flex-col items-center justify-center gap-4">
            {!file ? (
              <>
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                  <CloudUpload className="h-8 w-8 text-health-blue" />
                </div>
                <div className="text-center">
                  <p className="text-gray-700 font-medium">
                    Drag & drop your PDF file here
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    or click to browse from your device
                  </p>
                </div>
                <Button 
                  onClick={handleButtonClick}
                  className="mt-2 bg-health-blue hover:bg-health-blue-dark"
                >
                  Select File
                </Button>
                {fileError && (
                  <div className="flex items-center gap-2 text-red-600 mt-2">
                    <XCircle className="h-4 w-4" />
                    <span className="text-sm">{fileError}</span>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded">
                      <FileText className="h-6 w-6 text-health-blue" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <XCircle className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button
                    className="bg-health-blue hover:bg-health-blue-dark w-full sm:w-auto px-8"
                    onClick={onAnalyze}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Analyze Report
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Supported format: PDF (max 10MB)</p>
          <p className="mt-1">Your data remains private and secure</p>
        </div>
      </CardContent>
    </Card>
  );
};
