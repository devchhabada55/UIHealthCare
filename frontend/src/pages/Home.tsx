import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SpiderChart } from '@/components/visualizations/SpiderChart'; 
import { Button } from '@/components/ui/button';
import { CheckCircle2, Trash2, Eye } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ChatbotPopup from '@/components/ChatbotPopup'; 
import { useUpload } from '@/contexts/UploadContext';
import { useHealthData } from '@/contexts/HealthDataContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface PDFData {
  _id: string;
  originalName: string;
  uploadDate: string;
}

const spiderChartData = {
  physical: 85,
  mental: 90,
  nutrition: 88,
  sleep: 82,
  inflammatory: 75,
  medical: 80,
};

const HomePage = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [storedPDFs, setStoredPDFs] = useState<PDFData[]>([]);
  const [pdfToDelete, setPdfToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showUploadsModal, setShowUploadsModal] = useState(false);
  const { toast } = useToast();
  const { addUploadedFile } = useUpload();
  const { deleteAllPDFs } = useHealthData();

  // Fetch PDFs from the server
  const fetchAllPDFs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pdfs');
      if (!response.ok) throw new Error('Failed to fetch PDFs');
      const data = await response.json();
      setStoredPDFs(data.pdfs || []);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      toast({ description: "Failed to fetch stored PDFs", variant: "destructive" });
    }
  };

  // Handle PDF deletion
  const handleDeletePDF = async (id: string | undefined) => {
    if (!id) {
      toast({ description: "Invalid PDF ID", variant: "destructive" });
      return;
    }

    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:5000/api/pdfs/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete PDF');
      setStoredPDFs(prev => prev.filter(pdf => pdf._id !== id));
      toast({ description: "PDF deleted successfully" });
    } catch (error) {
      console.error('Error deleting PDF:', error);
      toast({ description: "Failed to delete PDF", variant: "destructive" });
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle "Delete All PDFs"
  const handleDeleteAll = async () => {
    try {
      await deleteAllPDFs();
      setStoredPDFs([]);
      toast({ description: "All PDFs deleted successfully" });
    } catch (error) {
      toast({ description: "Failed to delete all PDFs", variant: "destructive" });
    }
  };

  // Handle file selection for upload
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) setSelectedFiles(files);
  };

  // Handle file upload
  const handleSubmit = async () => {
    if (!selectedFiles) {
      toast({ description: "Please select files to upload", variant: "destructive" });
      return;
    }
    setIsUploading(true);
    try {
      for (const file of Array.from(selectedFiles)) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:5000/api/upload-pdf', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to upload ${file.name}`);
        }

        const data = await response.json();
        addUploadedFile(data);
        toast({ description: `Successfully uploaded ${file.name}` });
      }
      await fetchAllPDFs();
    } catch (error) {
      console.error('Error uploading files:', error);
      const errorMessage = (error instanceof Error && error.message) ? error.message : "Failed to upload files";
      toast({ description: errorMessage, variant: "destructive" });
    } finally {
      setIsUploading(false);
      setSelectedFiles(null);
    }
  };

  useEffect(() => {
    if (showUploadsModal) fetchAllPDFs();
  }, [showUploadsModal]);

  const UploadsModal = () => (
    <AlertDialog open={showUploadsModal} onOpenChange={setShowUploadsModal}>
      <AlertDialogContent className="max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Uploaded PDFs</AlertDialogTitle>
          <AlertDialogDescription>View and manage your uploaded PDF files</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          {storedPDFs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No PDFs uploaded yet</div>
          ) : (
            <div className="space-y-4">
              {storedPDFs.map((pdf, index) => (
  <div key={pdf._id || index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    <div>
      <p className="font-medium">{pdf.originalName}</p>
      <p className="text-sm text-gray-500">{new Date(pdf.uploadDate).toLocaleDateString()}</p>
    </div>
    <Button
      variant="destructive"
      size="sm"
      onClick={() => handleDeletePDF(pdf._id)}
      disabled={isDeleting}
    >
      <Trash2 className="h-4 w-4 mr-2" />
      {isDeleting ? 'Deleting...' : 'Delete'}
    </Button>
  </div>
))}
            </div>
          )}
        </div>
        <AlertDialogFooter>
          <Button variant="destructive" onClick={handleDeleteAll} disabled={isDeleting}>
            Delete All PDFs
          </Button>
          <AlertDialogCancel onClick={() => setShowUploadsModal(false)}>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <>
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-health-blue to-health-blue-light rounded-xl text-white p-8 shadow-lg">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold">Welcome to Your Health Dashboard</h1>
              <p className="text-white/90 text-lg">
                Upload health reports to see personalized insights and recommendations.
              </p>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="reports">Upload Reports (PDF)</Label>
              <div className="flex gap-2">
                <Input
                  id="reports"
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileSelect}
                  disabled={isUploading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSubmit}
                  disabled={!selectedFiles || isUploading}
                  className="bg-white text-blue-600 hover:bg-white/90"
                >
                  {isUploading ? 'Uploading...' : 'Submit'}
                </Button>
                <Button
                  onClick={() => setShowUploadsModal(true)}
                  className="bg-white/20 text-white hover:bg-white/30"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Uploads
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Health Overview (Spider Chart)</CardTitle>
            <CardDescription>Visualization of key health parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-full min-h-[400px] p-4">
              <SpiderChart data={spiderChartData} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-gray-50">
              <div className="font-medium">Name:</div>
              <div>Yves Vannerom</div>
              <div className="font-medium">Age:</div>
              <div>45</div>
              <div className="font-medium">Weight:</div>
              <div>93 Kg</div>
              <div className="font-medium">Height:</div>
              <div>184 cm</div>
              <div className="font-medium">Gender:</div>
              <div>Male</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ChatbotPopup />
      <UploadsModal />
    </>
  );
};

export default HomePage;