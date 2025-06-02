const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'analyzing', 'analyzed', 'error'],
    default: 'pending'
  },
  analysis: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  error: {
    type: String,
    default: null
  }
});

// Check if the model already exists before compiling
module.exports = mongoose.models.PDF || mongoose.model('PDF', pdfSchema); 