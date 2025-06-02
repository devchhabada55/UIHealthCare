const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { NutritionAnalyzer } = require('../utils/NutritionAnalyzer');
const PDF = require('../models/PDF');

// Configure multer for PDF upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `nutrition_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Initialize the analyzer
const analyzer = new NutritionAnalyzer();

// Get all nutrition PDFs
router.get('/', async (req, res) => {
  try {
    const pdfs = await PDF.find({ status: 'analyzed' }).sort({ uploadDate: -1 });
    res.json({ success: true, pdfs });
  } catch (error) {
    console.error('Error fetching nutrition PDFs:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to fetch PDFs' 
    });
  }
});

// Upload and analyze new file
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: 'No file uploaded' 
      });
    }

    console.log('Processing nutrition PDF:', req.file.originalname);
    
    // Create new PDF document
    const pdf = new PDF({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      status: 'analyzing'
    });
    await pdf.save();
    
    // Analyze the PDF
    const analysis = await analyzer.analyzePDF(req.file.path);
    
    // Update PDF document with analysis
    pdf.status = 'analyzed';
    pdf.analysis = analysis;
    await pdf.save();
    
    console.log('Analysis completed successfully');
    
    // Return the analysis results
    res.json({
      success: true,
      analysis: {
        lifestyleFactors: analysis.lifestyleFactors || null,
        bloodSugarControl: analysis.bloodSugarControl || null,
        heartHealth: analysis.heartHealth || null,
        essentialVitamins: analysis.essentialVitamins || null,
        inflammationAndMinerals: analysis.inflammationAndMinerals || null,
        priorityActionPlan: analysis.priorityActionPlan || null,
        redFlags: analysis.redFlags || null,
        successTracking: analysis.successTracking || null
      }
    });

  } catch (error) {
    console.error('Error processing nutrition PDF:', error);
    
    // Update PDF document with error if it exists
    if (req.file) {
      try {
        const pdf = await PDF.findOne({ filename: req.file.filename });
        if (pdf) {
          pdf.status = 'error';
          pdf.error = error.message;
          await pdf.save();
        }
      } catch (dbError) {
        console.error('Error updating PDF document:', dbError);
      }
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to process PDF' 
    });
  }
});

module.exports = router; 