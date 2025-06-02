const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PDF = require('../models/PDF');

// Configure Multer for PDF storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFilename = `${Date.now()}-${sanitizedFilename}`;
    cb(null, uniqueFilename);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get all PDFs
router.get('/', async (req, res) => {
  try {
    const pdfs = await PDF.find().sort({ uploadDate: -1 });
    res.status(200).json(pdfs);
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    res.status(500).json({ message: 'Error fetching PDFs', error: error.message });
  }
});

// Upload a PDF
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const pdf = new PDF({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path
    });

    await pdf.save();
    res.status(200).json({ pdfId: pdf._id });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload PDF' });
  }
});

// Delete a PDF
router.delete('/:id', async (req, res) => {
  try {
    const pdf = await PDF.findById(req.params.id);
    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    // Delete file from uploads directory
    const filePath = path.join(__dirname, '../uploads', pdf.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await PDF.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'PDF deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error deleting PDF', error: error.message });
  }
});

// Download a PDF
router.get('/:id/download', async (req, res) => {
  try {
    const pdf = await PDF.findById(req.params.id);
    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    const filePath = path.join(__dirname, '../uploads', pdf.filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }

    res.download(filePath, pdf.originalName);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: 'Error downloading PDF', error: error.message });
  }
});

// Delete all PDFs
router.delete('/', async (req, res) => {
  try {
    const pdfs = await PDF.find();
    
    // Delete all files from uploads directory
    for (const pdf of pdfs) {
      const filePath = path.join(__dirname, '../uploads', pdf.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete all records from database
    await PDF.deleteMany({});
    
    res.status(200).json({ message: 'All PDFs deleted successfully' });
  } catch (error) {
    console.error('Delete all error:', error);
    res.status(500).json({ message: 'Error deleting all PDFs', error: error.message });
  }
});

module.exports = router; 