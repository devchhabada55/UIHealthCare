const OpenAI = require('openai');
const fs = require('fs');
const pdf = require('pdf-parse');
const PDF = require('../models/PDF');

class SleepAnalyzer {
  constructor() {
    try {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || 'api'
      });
      this.model = 'gpt-4.1-nano-2025-04-14';
      this.analysisHistory = new Map();
    } catch (error) {
      console.error('Error initializing OpenAI:', error);
      throw new Error('Failed to initialize OpenAI client. Please check your API key.');
    }
  }

  async extractTextFromPDF(filePath) {
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      return data.text;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF');
    }
  }

  async analyzeText(text) {
    try {
      if (!this.openai) {
        throw new Error('OpenAI client not initialized');
      }

      const prompt = `You are a sleep health expert. Analyze the provided text and return a JSON object with the EXACT structure shown below. Do not modify the structure or add/remove fields.

REQUIRED RESPONSE STRUCTURE:
{
  "keyFindings": "A comprehensive summary of the most important findings from the analysis",
  "primaryGoal": "The main objective for improvement based on the analysis",
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
  "sleepQuality": {
    "overallScore": "Not assessed",
    "duration": "Not assessed",
    "efficiency": "Not assessed",
    "description": "No sleep quality data available"
  },
  "sleepPatterns": {
    "bedtime": "Not assessed",
    "wakeTime": "Not assessed",
    "consistency": "Not assessed",
    "description": "No sleep pattern data available"
  },
  "sleepStages": {
    "deepSleep": {
      "duration": "Not assessed",
      "percentage": "Not assessed",
      "quality": "Not assessed"
    },
    "remSleep": {
      "duration": "Not assessed",
      "percentage": "Not assessed",
      "quality": "Not assessed"
    },
    "lightSleep": {
      "duration": "Not assessed",
      "percentage": "Not assessed",
      "quality": "Not assessed"
    }
  },
  "sleepDisruptions": {
    "frequency": "Not assessed",
    "causes": [],
    "impact": "Not assessed",
    "description": "No sleep disruption data available"
  },
  "approach": {
    "sleepHygiene": {
      "environment": "To be determined",
      "routine": "To be determined",
      "habits": "To be determined"
    },
    "lifestyle": {
      "exercise": "To be determined",
      "diet": "To be determined",
      "stressManagement": "To be determined"
    },
    "monitoring": {
      "metrics": [],
      "frequency": "To be determined",
      "targets": "To be determined"
    }
  },
  "additionalNotes": [
    {
      "topic": "Data Availability",
      "explanation": "Limited data available for analysis",
      "severity": "Low",
      "action": "Collect more comprehensive data"
    }
  ],
  "chartData": {
    "sleepQuality": {
      "labels": [],
      "values": [],
      "colors": []
    }
  }
}`;

      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: 'You are a sleep health expert analyzing medical reports.' },
          { role: 'user', content: `${prompt}\n\nText to analyze:\n${text}` }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

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

  validateAndFormatAnalysis(analysis) {
    // Ensure all required fields are present
    const requiredFields = [
      'hrvAndRecovery',
      'restorativeSleep',
      'cortisolProfile',
      'alcoholImpact',
      'redFlags',
      'actionPlan'
    ];

    for (const field of requiredFields) {
      if (!analysis[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Format dates in dailyHRV and recoveryPercentageDuringSleep
    if (analysis.hrvAndRecovery.dailyHRV) {
      analysis.hrvAndRecovery.dailyHRV = this.formatDateValues(analysis.hrvAndRecovery.dailyHRV);
    }
    if (analysis.hrvAndRecovery.recoveryPercentageDuringSleep) {
      analysis.hrvAndRecovery.recoveryPercentageDuringSleep = this.formatDateValues(analysis.hrvAndRecovery.recoveryPercentageDuringSleep);
    }

    // Format dates in alcoholImpact.consumptionSummary
    if (analysis.alcoholImpact.consumptionSummary) {
      analysis.alcoholImpact.consumptionSummary = this.formatDateValues(analysis.alcoholImpact.consumptionSummary);
    }

    return analysis;
  }

  formatDateValues(obj) {
    const formatted = {};
    for (const [key, value] of Object.entries(obj)) {
      try {
        const date = new Date(key);
        if (!isNaN(date.getTime())) {
          formatted[date.toISOString().split('T')[0]] = value;
        } else {
          formatted[key] = value;
        }
      } catch (error) {
        formatted[key] = value;
      }
    }
    return formatted;
  }

  async analyzePDF(filePath) {
    try {
      // TODO: Implement actual PDF analysis logic
      // For now, return mock data
      const analysis = {
        keyFindings: "Overall sleep quality is good with some areas for improvement",
        sleepQuality: {
          value: 7.5,
          unit: "score",
          status: "Good",
          description: "Sleep quality is above average but could be improved"
        },
        sleepPatterns: {
          averageDuration: 7.2,
          consistency: 6.8,
          efficiency: 85,
          status: "Moderate",
          description: "Sleep patterns show good duration but inconsistent timing"
        },
        sleepStages: {
          deep: 20,
          light: 55,
          rem: 20,
          awake: 5,
          status: "Balanced",
          description: "Good distribution of sleep stages"
        },
        sleepDisruptions: {
          frequency: 2,
          duration: 15,
          causes: ["Environmental noise", "Stress"],
          status: "Mild",
          description: "Occasional disruptions with minimal impact"
        },
        approach: {
          sleepHygiene: [
            "Maintain consistent bedtime",
            "Limit screen time before bed",
            "Create dark, quiet environment"
          ],
          environment: [
            "Use blackout curtains",
            "Maintain cool temperature",
            "Reduce noise"
          ],
          schedule: [
            "Bedtime: 10:30 PM",
            "Wake time: 6:30 AM",
            "Consistent weekend schedule"
          ],
          habits: [
            "No caffeine after 2 PM",
            "Evening relaxation routine",
            "Regular exercise"
          ]
        },
        recommendations: [
          {
            category: "Sleep Environment",
            suggestion: "Use white noise machine",
            frequency: "Nightly",
            description: "Help mask environmental disturbances",
            priority: "Medium",
            timeframe: "Immediate"
          }
        ],
        additionalNotes: [
          {
            topic: "Sleep Onset",
            explanation: "Takes 20-30 minutes to fall asleep",
            severity: "Low",
            action: "Implement relaxation techniques"
          }
        ],
        chartData: {
          sleepMetrics: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [7.5, 7.2, 7.8, 7.0, 7.3, 8.0, 7.7],
            colors: ["#4CAF50", "#2196F3", "#FFC107", "#9C27B0", "#F44336", "#00BCD4", "#FF9800"]
          },
          sleepStages: {
            labels: ["Deep", "Light", "REM", "Awake"],
            values: [20, 55, 20, 5],
            colors: ["#4CAF50", "#2196F3", "#FFC107", "#F44336"]
          }
        }
      };

      // Store analysis in history
      const analysisId = Date.now().toString();
      this.analysisHistory.set(analysisId, analysis);

      return analysis;
    } catch (error) {
      console.error('Error analyzing PDF:', error);
      throw new Error('Failed to analyze PDF');
    }
  }

  getLatestAnalysis() {
    if (this.analysisHistory.size === 0) {
      return null;
    }
    return Array.from(this.analysisHistory.values()).pop();
  }

  getAnalysisById(id) {
    return this.analysisHistory.get(id) || null;
  }

  async getAnalysisHistory() {
    return Array.from(this.analysisHistory.entries()).map(([id, analysis]) => ({
      id,
      ...analysis
    }));
  }

  async deleteAnalysis(id) {
    return this.analysisHistory.delete(id);
  }
}

module.exports = { SleepAnalyzer }; 