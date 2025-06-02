import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPDFs, uploadPDF, deletePDF, analyzePDFs, downloadPDF, deleteAllPDFs } from '../services/api';

interface PDF {
  _id: string;
  filename: string;
  originalName: string;
  uploadDate: string;
  path: string;
}

interface PDFContextType {
  pdfs: PDF[];
  loading: boolean;
  error: string | null;
  uploadFile: (file: File) => Promise<void>;
  removePDF: (id: string) => Promise<void>;
  analyzeSelectedPDFs: (pdfIds: string[], healthType: string) => Promise<any>;
  downloadSelectedPDF: (id: string) => Promise<void>;
  removeAllPDFs: () => Promise<void>;
  refreshPDFs: () => Promise<void>;
}

const PDFContext = createContext<PDFContextType | undefined>(undefined);

export const PDFProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pdfs, setPDFs] = useState<PDF[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshPDFs = async () => {
    try {
      setLoading(true);
      const data = await getPDFs();
      setPDFs(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch PDFs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPDFs();
  }, []);

  const uploadFile = async (file: File) => {
    try {
      setLoading(true);
      await uploadPDF(file);
      await refreshPDFs();
      setError(null);
    } catch (err) {
      setError('Failed to upload PDF');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removePDF = async (id: string) => {
    try {
      setLoading(true);
      await deletePDF(id);
      await refreshPDFs();
      setError(null);
    } catch (err) {
      setError('Failed to delete PDF');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const analyzeSelectedPDFs = async (pdfIds: string[], healthType: string) => {
    try {
      setLoading(true);
      const result = await analyzePDFs(pdfIds, healthType);
      setError(null);
      return result;
    } catch (err) {
      setError('Failed to analyze PDFs');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const downloadSelectedPDF = async (id: string) => {
    try {
      setLoading(true);
      const blob = await downloadPDF(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = pdfs.find(pdf => pdf._id === id)?.originalName || 'document.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setError(null);
    } catch (err) {
      setError('Failed to download PDF');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeAllPDFs = async () => {
    try {
      setLoading(true);
      await deleteAllPDFs();
      await refreshPDFs();
      setError(null);
    } catch (err) {
      setError('Failed to delete all PDFs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PDFContext.Provider
      value={{
        pdfs,
        loading,
        error,
        uploadFile,
        removePDF,
        analyzeSelectedPDFs,
        downloadSelectedPDF,
        removeAllPDFs,
        refreshPDFs,
      }}
    >
      {children}
    </PDFContext.Provider>
  );
};

export const usePDF = () => {
  const context = useContext(PDFContext);
  if (context === undefined) {
    throw new Error('usePDF must be used within a PDFProvider');
  }
  return context;
}; 