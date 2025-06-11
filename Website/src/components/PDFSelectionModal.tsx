import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { useHealthData } from '@/contexts/HealthDataContext';
import { useToast } from "@/components/ui/use-toast";

type HealthType = 'medical' | 'dental' | 'vision';

interface PDFSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  healthType: HealthType;
}

const PDFSelectionModal: React.FC<PDFSelectionModalProps> = ({
  isOpen,
  onClose,
  healthType
}) => {
  const [pdfs, setPDFs] = useState<Array<{ _id: string; originalName: string }>>([]);
  const [selectedPDFs, setSelectedPDFs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { refreshData } = useHealthData();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchPDFs();
    }
  }, [isOpen]);

  const fetchPDFs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/pdfs');
      if (!response.ok) {
        throw new Error('Failed to fetch PDFs');
      }
      const data = await response.json();
      setPDFs(data);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      setError('Failed to load PDFs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (selectedPDFs.length === 0) {
      setError('Please select at least one PDF to analyze');
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);

      const response = await fetch('http://localhost:5000/api/analyze-pdfs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdfIds: selectedPDFs,
          healthType: healthType
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Failed to analyze PDFs');
      }

      await refreshData();

      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed selected PDFs for ${healthType} health.`,
      });

      onClose();
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze PDFs');
      toast({
        title: "Analysis Error",
        description: err instanceof Error ? err.message : 'Failed to analyze PDFs',
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedPDFs.length === pdfs.length) {
      // If all are selected, deselect all
      setSelectedPDFs([]);
    } else {
      // Otherwise, select all
      setSelectedPDFs(pdfs.map(pdf => pdf._id));
    }
  };

  const handleSelectPDF = (pdfId: string, checked: boolean) => {
    if (checked) {
      setSelectedPDFs(prev => [...prev, pdfId]);
    } else {
      setSelectedPDFs(prev => prev.filter(id => id !== pdfId));
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select PDFs to Analyze</DialogTitle>
          <DialogDescription>
            Choose one or more PDFs to analyze for {healthType} health
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="ml-2">Loading PDFs...</span>
            </div>
          ) : pdfs.length === 0 ? (
            <p className="text-center text-gray-500">No PDFs available</p>
          ) : (
            <>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  className="mb-2"
                >
                  {selectedPDFs.length === pdfs.length ? 'Deselect All' : 'Select All'}
                </Button>
              </div>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {pdfs.map((pdf) => (
                  <div
                    key={pdf._id}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
                  >
                    <Checkbox
                      id={pdf._id}
                      checked={selectedPDFs.includes(pdf._id)}
                      onCheckedChange={(checked) => handleSelectPDF(pdf._id, checked as boolean)}
                    />
                    <label
                      htmlFor={pdf._id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {pdf.originalName}
                    </label>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isAnalyzing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAnalyze}
            disabled={selectedPDFs.length === 0 || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              `Analyze ${selectedPDFs.length} PDF${selectedPDFs.length !== 1 ? 's' : ''}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PDFSelectionModal; 