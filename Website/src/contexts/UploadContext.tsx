import React, { createContext, useContext, useState, useEffect } from 'react';

interface UploadedFile {
  id: string;
  name: string;
  uploadDate: string;
  status: 'success' | 'error';
}

interface UploadContextType {
  uploadedFiles: UploadedFile[];
  addUploadedFile: (file: UploadedFile) => void;
  clearUploadedFiles: () => void;
  isFileUploaded: (fileName: string) => boolean;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(() => {
    // Load from localStorage on initial render
    const savedFiles = localStorage.getItem('uploadedFiles');
    return savedFiles ? JSON.parse(savedFiles) : [];
  });

  // Save to localStorage whenever uploadedFiles changes
  useEffect(() => {
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const addUploadedFile = (file: UploadedFile) => {
    setUploadedFiles(prev => {
      // Check if file already exists
      const exists = prev.some(f => f.name === file.name);
      if (exists) return prev;
      return [...prev, file];
    });
  };

  const clearUploadedFiles = () => {
    setUploadedFiles([]);
    localStorage.removeItem('uploadedFiles');
  };

  const isFileUploaded = (fileName: string) => {
    return uploadedFiles.some(file => file.name === fileName);
  };

  return (
    <UploadContext.Provider value={{ uploadedFiles, addUploadedFile, clearUploadedFiles, isFileUploaded }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (context === undefined) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
}; 