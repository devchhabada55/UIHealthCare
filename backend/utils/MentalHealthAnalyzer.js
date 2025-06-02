const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const winston = require('winston');
const PDF = require('../models/PDF');
const fsPromises = require('fs').promises;

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/mental_health_analysis.log')
    })
  ]
});

class MentalHealthAnalyzer {
  constructor() {
    try {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || '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'
      });
      this.model = 'gpt-4.1-nano-2025-04-14';
      this.analysisHistory = new Map();
    } catch (error) {
      console.error('Error initializing OpenAI:', error);
      throw new Error('Failed to initialize OpenAI client. Please check your API key.');
    }
  }

  async logAnalysis(analysis, error = null) {
    try {
      const logEntry = {
        timestamp: new Date().toISOString(),
        analysis,
        error: error ? error.message : null
      };
      logger.info('Mental Health Analysis', logEntry);
      return logEntry;
    } catch (error) {
      console.error('Error logging analysis:', error);
      return null;
    }
  }

  validateAnalysis(analysis) {
    if (!analysis || typeof analysis !== 'object') {
      throw new Error('Invalid analysis data: must be an object');
    }

    const requiredFields = [
      'keyFindings',
      'stressAndRecoveryBalance',
      'cognitivePerformance',
      'emotionalWellbeing',
      'mentalResilience',
      'currentMentalActivity',
      'primaryGoal',
      'recommendations',
      'additionalNotes'
    ];

    for (const field of requiredFields) {
      if (!analysis[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validate numerical values
    if (analysis.stressAndRecoveryBalance?.value !== undefined) {
      const value = Number(analysis.stressAndRecoveryBalance.value);
      if (isNaN(value)) {
        throw new Error('Stress and Recovery Balance value must be a valid number');
      }
    }

    if (analysis.cognitivePerformance?.value !== undefined) {
      const value = Number(analysis.cognitivePerformance.value);
      if (isNaN(value)) {
        throw new Error('Cognitive Performance value must be a valid number');
      }
    }

    if (analysis.emotionalWellbeing?.measurements?.moodStability?.value !== undefined) {
      const value = Number(analysis.emotionalWellbeing.measurements.moodStability.value);
      if (isNaN(value)) {
        throw new Error('Mood Stability value must be a valid number');
      }
    }

    if (analysis.emotionalWellbeing?.measurements?.emotionalRegulation?.value !== undefined) {
      const value = Number(analysis.emotionalWellbeing.measurements.emotionalRegulation.value);
      if (isNaN(value)) {
        throw new Error('Emotional Regulation value must be a valid number');
      }
    }

    if (analysis.mentalResilience?.metrics?.stressResponseProfile?.value !== undefined) {
      const value = Number(analysis.mentalResilience.metrics.stressResponseProfile.value);
      if (isNaN(value)) {
        throw new Error('Stress Response Profile value must be a valid number');
      }
    }

    if (analysis.mentalResilience?.metrics?.copingMechanisms?.value !== undefined) {
      const value = Number(analysis.mentalResilience.metrics.copingMechanisms.value);
      if (isNaN(value)) {
        throw new Error('Coping Mechanisms value must be a valid number');
      }
    }

    // Validate chart data if present
    if (analysis.chartData) {
      if (analysis.chartData.mentalPerformanceMetrics?.values) {
        const values = analysis.chartData.mentalPerformanceMetrics.values.map(v => Number(v));
        if (values.some(isNaN)) {
          throw new Error('Mental Performance Metrics chart values must be valid numbers');
        }
      }

      if (analysis.chartData.progressTracking?.stressLevels) {
        const values = analysis.chartData.progressTracking.stressLevels.map(v => Number(v));
        if (values.some(isNaN)) {
          throw new Error('Progress Tracking stress levels must be valid numbers');
        }
      }

      if (analysis.chartData.progressTracking?.moodScores) {
        const values = analysis.chartData.progressTracking.moodScores.map(v => Number(v));
        if (values.some(isNaN)) {
          throw new Error('Progress Tracking mood scores must be valid numbers');
        }
      }
    }

    return true;
  }

  async analyzeText(text) {
    try {
      if (!this.openai) {
        throw new Error('OpenAI client not initialized');
      }

      if (!text || typeof text !== 'string') {
        throw new Error('Invalid text input: must be a non-empty string');
      }

      const prompt = `You are a mental health expert. Analyze the provided text and return a JSON object with the EXACT structure shown below. Do not modify the structure or add/remove fields. All fields are required unless marked as optional.

REQUIRED RESPONSE STRUCTURE:
{
  "keyFindings": "A comprehensive summary of the most important findings from the analysis",
  "stressAndRecoveryBalance": {
    "value": 7,
    "unit": "score",
    "status": "Optimal",
    "description": "Detailed description of stress and recovery balance"
  },
  "cognitivePerformance": {
    "value": 8,
    "unit": "score",
    "status": "Optimal",
    "description": "Detailed description of cognitive performance"
  },
  "emotionalWellbeing": {
    "measurements": {
      "moodStability": {
        "value": 7,
        "unit": "score",
        "status": "Optimal"
      },
      "emotionalRegulation": {
        "value": 8,
        "unit": "score",
        "status": "Optimal"
      }
    },
    "status": "Optimal",
    "description": "Detailed description of emotional wellbeing"
  },
  "mentalResilience": {
    "metrics": {
      "stressResponseProfile": {
        "value": 7,
        "unit": "score",
        "status": "Optimal"
      },
      "copingMechanisms": {
        "value": 8,
        "unit": "score",
        "status": "Optimal"
      }
    },
    "status": "Optimal",
    "description": "Detailed description of mental resilience"
  },
  "currentMentalActivity": {
    "level": "Optimal",
    "patterns": ["Pattern 1", "Pattern 2"],
    "description": "Detailed description of current mental activity"
  },
  "primaryGoal": "The main objective for improvement based on the analysis",
  "approach": {
    "mentalTraining": {
      "modality": "Type of training",
      "frequency": "How often",
      "intensity": "Level of intensity",
      "duration": "Duration of sessions",
      "progression": "How to progress"
    },
    "recovery": {
      "mentalRest": "Rest recommendations",
      "brainNutrition": "Nutrition advice",
      "sleepHygiene": "Sleep recommendations",
      "emotionalRegulation": "Emotional regulation strategies"
    },
    "lifestyle": {
      "screenTime": "Screen time recommendations",
      "socialEngagement": "Social engagement advice",
      "mindfulnessPractices": "Mindfulness recommendations",
      "environment": "Environmental factors"
    },
    "monitoring": {
      "metrics": ["Metric 1", "Metric 2"],
      "frequency": "How often to monitor",
      "targets": "Target values",
      "adjustments": "How to adjust"
    }
  },
  "recommendations": [
    {
      "category": "Category of the recommendation",
      "suggestion": "Specific action to take",
      "frequency": "How often to perform",
      "description": "Detailed explanation",
      "priority": "High/Medium/Low",
      "timeframe": "When to implement"
    }
  ],
  "additionalNotes": [
    {
      "topic": "Topic of note",
      "explanation": "Detailed explanation",
      "severity": "High/Medium/Low",
      "action": "Required action"
    }
  ],
  "chartData": {
    "mentalPerformanceMetrics": {
      "labels": ["Label 1", "Label 2"],
      "values": [7, 8],
      "colors": ["#3b82f6", "#22c55e"]
    },
    "progressTracking": {
      "labels": ["Label 1", "Label 2"],
      "stressLevels": [5, 4],
      "moodScores": [7, 8]
    }
  }
}`;

      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: 'You are a mental health expert analyzing medical reports.' },
          { role: 'user', content: `${prompt}\n\nText to analyze:\n${text}` }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      if (!response.choices?.[0]?.message?.content) {
        throw new Error('Invalid response from OpenAI API');
      }

      const analysis = JSON.parse(response.choices[0].message.content);
      this.validateAnalysis(analysis);
      await this.logAnalysis(analysis);
      return analysis;
    } catch (error) {
      console.error('Error analyzing text:', error);
      await this.logAnalysis(null, error);
      throw new Error(`Failed to analyze text: ${error.message}`);
    }
  }

  async extractTextFromPDF(pdfPath) {
    try {
      if (!pdfPath || typeof pdfPath !== 'string') {
        throw new Error('Invalid PDF path: must be a non-empty string');
      }

      if (!fs.existsSync(pdfPath)) {
        throw new Error(`PDF file not found at path: ${pdfPath}`);
      }

      const dataBuffer = fs.readFileSync(pdfPath);
      const data = await pdf(dataBuffer);
      return data.text;
    } catch (error) {
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  }

  async analyzePDF(filePath) {
    try {
      // Read the PDF file
      const dataBuffer = await fsPromises.readFile(filePath);
      const data = await pdf(dataBuffer);

      // Extract text content
      const text = data.text;

      // Parse the text to extract relevant information
      const analysis = {
        keyFindings: this.extractKeyFindings(text),
        stressAndRecoveryBalance: this.extractStressAndRecoveryBalance(text),
        cognitivePerformance: this.extractCognitivePerformance(text),
        recommendations: this.extractRecommendations(text)
      };

      return analysis;
    } catch (error) {
      console.error('Error analyzing mental health PDF:', error);
      throw new Error('Failed to analyze mental health PDF');
    }
  }

  extractKeyFindings(text) {
    // Look for key findings section
    const keyFindingsMatch = text.match(/Key Findings:?\s*([\s\S]*?)(?=\n\n|\n[A-Z]|$)/i);
    return keyFindingsMatch ? keyFindingsMatch[1].trim() : 'No key findings available';
  }

  extractStressAndRecoveryBalance(text) {
    // Look for stress and recovery balance section
    const stressMatch = text.match(/Stress and Recovery Balance:?\s*([\s\S]*?)(?=\n\n|\n[A-Z]|$)/i);
    if (!stressMatch) return null;

    const stressText = stressMatch[1];
    const valueMatch = stressText.match(/(\d+(?:\.\d+)?)/);
    const unitMatch = stressText.match(/(?:score|level|index|rating)/i);
    const descriptionMatch = stressText.match(/(?:description|summary|overview):?\s*([\s\S]*?)(?=\n|$)/i);

    return {
      value: valueMatch ? parseFloat(valueMatch[1]) : null,
      unit: unitMatch ? unitMatch[0] : 'score',
      description: descriptionMatch ? descriptionMatch[1].trim() : 'No description available'
    };
  }

  extractCognitivePerformance(text) {
    // Look for cognitive performance section
    const cognitiveMatch = text.match(/Cognitive Performance:?\s*([\s\S]*?)(?=\n\n|\n[A-Z]|$)/i);
    if (!cognitiveMatch) return null;

    const cognitiveText = cognitiveMatch[1];
    const valueMatch = cognitiveText.match(/(\d+(?:\.\d+)?)/);
    const unitMatch = cognitiveText.match(/(?:score|level|index|rating)/i);
    const descriptionMatch = cognitiveText.match(/(?:description|summary|overview):?\s*([\s\S]*?)(?=\n|$)/i);

    return {
      value: valueMatch ? parseFloat(valueMatch[1]) : null,
      unit: unitMatch ? unitMatch[0] : 'score',
      description: descriptionMatch ? descriptionMatch[1].trim() : 'No description available'
    };
  }

  extractRecommendations(text) {
    // Look for recommendations section
    const recommendationsMatch = text.match(/Recommendations:?\s*([\s\S]*?)(?=\n\n|\n[A-Z]|$)/i);
    if (!recommendationsMatch) return [];

    const recommendationsText = recommendationsMatch[1];
    const recommendations = [];

    // Split recommendations by bullet points or numbers
    const items = recommendationsText.split(/(?:\n\s*[-•*]\s*|\n\s*\d+\.\s*)/).filter(Boolean);

    items.forEach(item => {
      const categoryMatch = item.match(/(?:category|type):?\s*([^:]+)/i);
      const suggestionMatch = item.match(/(?:suggestion|recommendation):?\s*([^:]+)/i);
      const descriptionMatch = item.match(/(?:description|details):?\s*([\s\S]*?)(?=\n|$)/i);

      if (suggestionMatch) {
        recommendations.push({
          category: categoryMatch ? categoryMatch[1].trim() : 'General',
          suggestion: suggestionMatch[1].trim(),
          description: descriptionMatch ? descriptionMatch[1].trim() : 'No description available'
        });
      }
    });

    return recommendations;
  }

  async analyzePDFs(filePaths) {
    try {
      if (!Array.isArray(filePaths) || filePaths.length === 0) {
        throw new Error('Invalid file paths: must be a non-empty array');
      }

      logger.info('Starting analysis of multiple PDFs', { fileCount: filePaths.length });
      // Extract text from all PDFs
      const texts = await Promise.all(
        filePaths.map(filePath => this.extractTextFromPDF(filePath))
      );

      // Combine all texts
      const combinedText = texts.join('\n\n---\n\n');

      // Analyze the combined text
      const analysis = await this.analyzeText(combinedText);
      
      // Store analysis in history using Map
      const analysisId = Date.now().toString();
      this.analysisHistory.set(analysisId, analysis);

      // Store analysis in database for each PDF
      for (const filePath of filePaths) {
        const pdf = await PDF.findOne({ path: filePath });
        if (pdf) {
          pdf.status = 'analyzed';
          pdf.analysis = analysis;
          await pdf.save();
          logger.info('Stored analysis in database', { pdfId: pdf._id });
        } else {
          logger.warn('PDF not found in database', { filePath });
        }
      }

      logger.info('Successfully analyzed multiple PDFs', { fileCount: filePaths.length, analysisId });
      return analysis;
    } catch (error) {
      logger.error('Error analyzing multiple PDFs:', { error: error.message });
      throw new Error(`Failed to analyze PDFs: ${error.message}`);
    }
  }

  async getLatestAnalysis() {
    try {
      // First try to get from database
      const latestPDF = await PDF.findOne({ status: 'analyzed' }).sort({ uploadDate: -1 });
      if (latestPDF && latestPDF.analysis) {
        logger.info('Retrieved latest analysis from database', { pdfId: latestPDF._id });
        return latestPDF.analysis;
      }

      // Fallback to in-memory history
      if (this.analysisHistory.size === 0) {
        logger.warn('No analysis history available');
        return null;
      }
      const entries = Array.from(this.analysisHistory.entries());
      const latestAnalysis = entries[entries.length - 1][1];
      logger.info('Retrieved latest analysis from memory', { analysisId: entries[entries.length - 1][0] });
      return latestAnalysis;
    } catch (error) {
      logger.error('Error getting latest analysis:', { error: error.message });
      throw new Error(`Failed to get latest analysis: ${error.message}`);
    }
  }

  async getAnalysisById(id) {
    try {
      // First try to get from database
      const pdf = await PDF.findById(id);
      if (pdf && pdf.analysis) {
        logger.info('Retrieved analysis from database', { pdfId: id });
        return pdf.analysis;
      }

      // Fallback to in-memory history
      const analysis = this.analysisHistory.get(id);
      if (!analysis) {
        logger.warn('Analysis not found', { analysisId: id });
        return null;
      }
      logger.info('Retrieved analysis from memory', { analysisId: id });
      return analysis;
    } catch (error) {
      logger.error('Error getting analysis by ID:', { error: error.message, analysisId: id });
      throw new Error(`Failed to get analysis by ID: ${error.message}`);
    }
  }

  async getAnalysisHistory() {
    try {
      // Get from database
      const pdfs = await PDF.find({ status: 'analyzed' }).sort({ uploadDate: -1 });
      const history = pdfs.map(pdf => ({
        id: pdf._id.toString(),
        timestamp: pdf.uploadDate.toISOString(),
        analysis: pdf.analysis
      }));

      // Add in-memory history
      const memoryHistory = Array.from(this.analysisHistory.entries()).map(([id, analysis]) => ({
        id,
        timestamp: new Date(parseInt(id)).toISOString(),
        analysis
      }));

      // Combine and sort by timestamp
      const combinedHistory = [...history, ...memoryHistory].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      logger.info('Retrieved analysis history', { count: combinedHistory.length });
      return combinedHistory;
    } catch (error) {
      logger.error('Error getting analysis history:', { error: error.message });
      throw new Error(`Failed to get analysis history: ${error.message}`);
    }
  }

  async deleteAnalysis(id) {
    try {
      // Try to delete from database
      const pdf = await PDF.findById(id);
      if (pdf) {
        pdf.status = 'pending';
        pdf.analysis = null;
        await pdf.save();
        logger.info('Deleted analysis from database', { pdfId: id });
        return true;
      }

      // Fallback to in-memory history
      const result = this.analysisHistory.delete(id);
      if (result) {
        logger.info('Deleted analysis from memory', { analysisId: id });
      } else {
        logger.warn('Analysis not found for deletion', { analysisId: id });
      }
      return result;
    } catch (error) {
      logger.error('Error deleting analysis:', { error: error.message, analysisId: id });
      throw new Error(`Failed to delete analysis: ${error.message}`);
    }
  }
}

module.exports = { MentalHealthAnalyzer };