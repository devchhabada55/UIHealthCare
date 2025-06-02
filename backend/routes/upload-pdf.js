const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: path.join(__dirname, '../uploads'),
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  },
});

// Upload PDF endpoint
router.post('/upload-pdf', upload.single('file'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Rename file to include original name
    const newFileName = `${Date.now()}-${file.originalname}`;
    const newFilePath = path.join(__dirname, '../uploads', newFileName);

    // Ensure the uploads directory exists
    if (!fs.existsSync(path.join(__dirname, '../uploads'))) {
      fs.mkdirSync(path.join(__dirname, '../uploads'));
    }

    fs.renameSync(file.path, newFilePath);

    res.status(200).json({
      message: 'File uploaded successfully',
      fileName: newFileName,
      originalName: file.originalname,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Fetch uploaded PDFs endpoint
router.get('/', (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads');
    const files = fs.readdirSync(uploadsDir).map((fileName) => ({
      fileName,
      originalName: fileName.split('-').slice(1).join('-'),
    }));

    res.status(200).json({ pdfs: files });
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    res.status(500).json({ error: 'Failed to fetch PDFs' });
  }
});

// Delete PDF endpoint
router.delete('/:fileName', (req, res) => {
  try {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, '../uploads', fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    fs.unlinkSync(filePath);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

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

module.exports = router;