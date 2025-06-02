const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { SleepAnalyzer } = require('../utils/SleepAnalyzer');
const PDF = require('../models/PDF');

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Initialize the sleep analyzer
const sleepAnalyzer = new SleepAnalyzer();

// Get latest sleep analysis
router.get('/', async (req, res) => {
  try {
    const analysis = sleepAnalyzer.getLatestAnalysis();
    res.json(analysis || {});
  } catch (error) {
    console.error('Error getting latest analysis:', error);
    res.status(500).json({ error: 'Failed to get latest analysis' });
  }
});

// Upload and analyze PDF
router.post('/analyze', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const analysis = await sleepAnalyzer.analyzePDF(req.file.path);
    res.json({ analysis });
  } catch (error) {
    console.error('Error analyzing PDF:', error);
    res.status(500).json({ error: 'Failed to analyze PDF' });
  }
});

// Get analysis by ID
router.get('/:id', async (req, res) => {
  try {
    const analysis = sleepAnalyzer.getAnalysisById(req.params.id);
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }
    res.json({ analysis });
  } catch (error) {
    console.error('Error getting analysis:', error);
    res.status(500).json({ error: 'Failed to get analysis' });
  }
});

// Get analysis history
router.get('/history', async (req, res) => {
  try {
    const history = await sleepAnalyzer.getAnalysisHistory();
    res.json({ success: true, history });
  } catch (error) {
    console.error('Error fetching analysis history:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete analysis
router.delete('/:id', async (req, res) => {
  try {
    const success = await sleepAnalyzer.deleteAnalysis(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Analysis not found' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting analysis:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 