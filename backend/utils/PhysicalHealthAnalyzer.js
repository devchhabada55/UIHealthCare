const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const winston = require('winston');
const PDF = require('../models/PDF');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/physical_health_analysis.log')
    })
  ]
});

class PhysicalHealthAnalyzer {
  constructor() {
    try {
      this.openai = new OpenAI({
        apiKey: 'api' // 🔥 REPLACE with your actual API key
      });
      this.model = 'gpt-4.1-nano-2025-04-14';
      this.analysisHistory = new Map();
    } catch (error) {
      console.error('Error initializing OpenAI:', error);
      throw new Error('Failed to initialize OpenAI client. Please check your API key.');
    }
  }

  async logAnalysis(analysis, error = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      analysis,
      error: error ? error.message : null
    };
    logger.info('Physical Health Analysis', logEntry);
    return logEntry;
  }

  validateAnalysis(analysis) {
    if (!analysis || typeof analysis !== 'object') {
      throw new Error('Invalid analysis: must be a valid object');
    }

    const essentialFields = ['keyFindings', 'primaryGoal', 'recommendations'];
    for (const field of essentialFields) {
      if (!analysis[field]) {
        throw new Error(`Missing essential field: ${field}`);
      }
    }

    const checkNumbers = (obj, keyPath) => {
      if (obj?.[keyPath]?.value !== undefined) {
        const value = Number(obj[keyPath].value);
        if (isNaN(value)) {
          throw new Error(`${keyPath} value must be a valid number`);
        }
      }
    };

    checkNumbers(analysis, 'phaseAngle');
    checkNumbers(analysis, 'vo2max');

    const valuesCheck = (values, name) => {
      if (Array.isArray(values) && values.some(v => isNaN(Number(v)))) {
        throw new Error(`${name} values must be valid numbers`);
      }
    };

    const metrics = analysis.chartData?.performanceMetrics?.values;
    if (metrics) valuesCheck(metrics, 'Performance metrics');

    const phaseValues = analysis.chartData?.progressTracking?.phaseAngle;
    if (phaseValues) valuesCheck(phaseValues, 'Progress tracking phaseAngle');

    const vo2Values = analysis.chartData?.progressTracking?.vo2max;
    if (vo2Values) valuesCheck(vo2Values, 'Progress tracking VO2max');

    return true;
  }

  async analyzeText(text) {
    try {
      if (!this.openai) {
        throw new Error('OpenAI client not initialized');
      }

      const instruction = `
You are a professional physical health expert analyzing patient health reports.
Return your analysis as a **valid JSON** object using the structure specified below.
Wrap the JSON output inside a markdown \`\`\`json code block\`\`\`.
**Do not add any text outside the code block**.

Use this exact schema:
{
  "keyFindings": "...",
  "primaryGoal": "...",
  "recommendations": [
    {
      "category": "...",
      "suggestion": "...",
      "frequency": "...",
      "description": "...",
      "priority": "...",
      "timeframe": "..."
    }
  ],
  "phaseAngle": {
    "value": null,
    "unit": "degrees",
    "status": "...",
    "description": "..."
  },
  "vo2max": {
    "value": null,
    "unit": "ml/kg/min",
    "status": "...",
    "description": "..."
  },
  "bodyComposition": {
    "measurements": {
      "bodyFat": { "value": null, "unit": "%", "status": "..." },
      "muscleMass": { "value": null, "unit": "kg", "status": "..." }
    },
    "status": "...",
    "description": "..."
  },
  "strengthAssessment": {
    "metrics": {
      "upperBody": { "value": null, "unit": "kg", "status": "..." },
      "lowerBody": { "value": null, "unit": "kg", "status": "..." }
    },
    "status": "...",
    "description": "..."
  },
  "currentActivity": {
    "level": "...",
    "patterns": [],
    "description": "..."
  },
  "approach": {
    "training": {
      "modality": "...", "frequency": "...", "intensity": "...",
      "duration": "...", "progression": "..."
    },
    "recovery": {
      "rest": "...", "nutrition": "...", "sleep": "...",
      "stressManagement": "..."
    },
    "lifestyle": {
      "activity": "...", "habits": "...", "environment": "..."
    },
    "monitoring": {
      "metrics": [], "frequency": "...", "targets": "...",
      "adjustments": "..."
    }
  },
  "additionalNotes": [
    {
      "topic": "...",
      "explanation": "...",
      "severity": "...",
      "action": "..."
    }
  ],
  "chartData": {
    "performanceMetrics": {
      "labels": [], "values": [], "colors": []
    },
    "progressTracking": {
      "labels": [], "phaseAngle": [], "vo2max": []
    }
  }
}`;

      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: instruction },
          { role: 'user', content: `Here is the text to analyze:\n\n${text}` }
        ],
        temperature: 0.4,
        max_tokens: 2000
      });

      const rawContent = response.choices[0].message.content;
      const jsonMatch = rawContent.match(/```json\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch?.[1] || rawContent;

      const analysis = JSON.parse(jsonString);
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
      const dataBuffer = fs.readFileSync(pdfPath);
      const data = await pdf(dataBuffer);
      return data.text;
    } catch (error) {
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  }

  async analyzePDF(filePath) {
    try {
      const text = await this.extractTextFromPDF(filePath);
      const analysis = await this.analyzeText(text);
      const id = Date.now().toString();
      this.analysisHistory.set(id, analysis);
      return analysis;
    } catch (error) {
      throw new Error('Failed to analyze PDF');
    }
  }

  async analyzePDFs(filePaths) {
    try {
      const texts = await Promise.all(filePaths.map(filePath => this.extractTextFromPDF(filePath)));
      const combinedText = texts.join('\n\n---\n\n');
      const analysis = await this.analyzeText(combinedText);

      const analysisEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        analysis
      };
      this.analysisHistory.set(analysisEntry.id, analysisEntry);
      return analysis;
    } catch (error) {
      throw new Error(`Failed to analyze PDFs: ${error.message}`);
    }
  }

  getLatestAnalysis() {
    if (this.analysisHistory.size === 0) return null;
    return Array.from(this.analysisHistory.values()).pop();
  }

  getAnalysisById(id) {
    return this.analysisHistory.get(id) || null;
  }

  async getAnalysisHistory() {
    return Array.from(this.analysisHistory.entries()).map(([id, analysis]) => ({ id, ...analysis }));
  }

  async deleteAnalysis(id) {
    return this.analysisHistory.delete(id);
  }
}

module.exports = { PhysicalHealthAnalyzer };
