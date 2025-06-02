const OpenAI = require('openai');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const winston = require('winston');
const path = require('path');

// Configure logger with multiple transports
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.errors({ stack: true })
  ),
  transports: [
    // File transport for all logs
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/nutrition_analysis.log'),
      level: 'info'
    }),
    // File transport for errors only
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/nutrition_errors.log'),
      level: 'error'
    }),
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Create a stream object for Morgan
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

class NutritionAnalyzer {
  constructor() {
    try {
      logger.info('Initializing NutritionAnalyzer');
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || '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'
      });
      this.model = 'gpt-4.1-nano-2025-04-14';
      this.analysisHistory = new Map();
      logger.info('NutritionAnalyzer initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize NutritionAnalyzer', { error: error.message, stack: error.stack });
      throw new Error('Failed to initialize OpenAI client');
    }
  }

  async logAnalysis(analysis, error = null) {
    try {
      const logEntry = {
        timestamp: new Date().toISOString(),
        analysis,
        error: error ? {
          message: error.message,
          stack: error.stack
        } : null
      };
      
      if (error) {
        logger.error('Analysis failed', logEntry);
      } else {
        logger.info('Analysis completed successfully', {
          timestamp: logEntry.timestamp,
          hasAnalysis: !!analysis
        });
      }
      
      return logEntry;
    } catch (error) {
      logger.error('Error logging analysis', { error: error.message, stack: error.stack });
      return null;
    }
  }

  validateAnalysis(analysis) {
    logger.info('Starting analysis validation');
    try {
      if (!analysis || typeof analysis !== 'object') {
        throw new Error('Invalid analysis data: must be an object');
      }

      const requiredFields = [
        'lifestyleFactors',
        'bloodSugarControl',
        'heartHealth',
        'essentialVitamins',
        'inflammationAndMinerals',
        'priorityActionPlan',
        'redFlags',
        'successTracking'
      ];

      // Log missing fields
      const missingFields = requiredFields.filter(field => !analysis[field]);
      if (missingFields.length > 0) {
        logger.warn('Missing required fields', { missingFields });
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate numerical values with more flexible validation
      const validateNumber = (value, field) => {
        // Allow null or undefined values, but log them
        if (value === null || value === undefined) {
          logger.warn('Missing value', { field, value });
          return;
        }
        // If value exists, ensure it's a valid number
        if (isNaN(value) || typeof value !== 'number') {
          logger.warn('Invalid number value', { field, value });
          throw new Error(`${field} must be a valid number`);
        }
      };

      // Log validation progress
      logger.info('Validating lifestyle factors');
      const lifestyleFields = ['sleep', 'stress', 'exercise', 'hydration'];
      lifestyleFields.forEach(field => {
        validateNumber(analysis.lifestyleFactors[field], `Lifestyle factor ${field}`);
      });

      logger.info('Validating blood sugar control');
      const bloodSugarFields = ['fastingGlucose', 'hba1c', 'insulinSensitivity'];
      bloodSugarFields.forEach(field => {
        validateNumber(analysis.bloodSugarControl[field], `Blood sugar ${field}`);
      });

      logger.info('Validating heart health');
      const heartHealthFields = ['bloodPressure', 'cholesterol', 'triglycerides'];
      heartHealthFields.forEach(field => {
        validateNumber(analysis.heartHealth[field], `Heart health ${field}`);
      });

      logger.info('Validating essential vitamins');
      const vitaminFields = ['vitaminD', 'b12', 'iron'];
      vitaminFields.forEach(field => {
        validateNumber(analysis.essentialVitamins[field], `Vitamin ${field}`);
      });

      logger.info('Validating inflammation and minerals');
      const mineralFields = ['crp', 'magnesium', 'zinc'];
      mineralFields.forEach(field => {
        validateNumber(analysis.inflammationAndMinerals[field], `Mineral ${field}`);
      });

      // Validate arrays
      const validateArray = (arr, field) => {
        if (!Array.isArray(arr)) {
          logger.warn('Invalid array', { field, value: arr });
          throw new Error(`${field} must be an array`);
        }
      };

      logger.info('Validating arrays');
      validateArray(analysis.priorityActionPlan.shortTerm, 'Short term action plan');
      validateArray(analysis.priorityActionPlan.mediumTerm, 'Medium term action plan');
      validateArray(analysis.priorityActionPlan.longTerm, 'Long term action plan');
      validateArray(analysis.redFlags.critical, 'Critical red flags');
      validateArray(analysis.redFlags.warning, 'Warning red flags');
      validateArray(analysis.redFlags.attention, 'Attention red flags');
      validateArray(analysis.successTracking.keyMetrics, 'Key metrics');
      validateArray(analysis.successTracking.milestones, 'Milestones');
      validateArray(analysis.successTracking.recommendations, 'Recommendations');

      logger.info('Analysis validation completed successfully');
      return true;
    } catch (error) {
      logger.error('Analysis validation failed', { error: error.message, stack: error.stack });
      throw error;
    }
  }

  async extractTextFromPDF(filePath) {
    logger.info('Starting PDF text extraction', { filePath });
    try {
      if (!filePath || typeof filePath !== 'string') {
        throw new Error('Invalid file path: must be a non-empty string');
      }

      if (!fs.existsSync(filePath)) {
        logger.error('PDF file not found', { filePath });
        throw new Error(`PDF file not found at path: ${filePath}`);
      }

      const dataBuffer = fs.readFileSync(filePath);
      logger.info('PDF file read successfully', { fileSize: dataBuffer.length });

      const data = await pdfParse(dataBuffer);
      
      if (!data.text || typeof data.text !== 'string') {
        logger.error('Failed to extract text from PDF', { filePath });
        throw new Error('Failed to extract text from PDF');
      }

      logger.info('PDF text extraction completed', { 
        textLength: data.text.length,
        numPages: data.numpages
      });

      return data.text;
    } catch (error) {
      logger.error('PDF text extraction failed', { 
        error: error.message, 
        stack: error.stack,
        filePath 
      });
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  }

  async analyzeText(text) {
    logger.info('Starting text analysis');
    try {
      if (!text || typeof text !== 'string') {
        throw new Error('Invalid text input: must be a non-empty string');
      }

      logger.info('Preparing analysis prompt', { textLength: text.length });

      const prompt = `You are a nutrition analysis expert. Analyze the following nutrition report and provide a structured analysis in JSON format.
      Focus on extracting and analyzing the following areas:

      1. Lifestyle Factors (score each from 0-100):
         - Sleep Quality (number between 0-100)
         - Stress Management (number between 0-100)
         - Exercise Level (number between 0-100)
         - Hydration (number between 0-100)

      2. Blood Sugar Control (provide actual values, use 0 if not available):
         - Fasting Glucose (mg/dL, number)
         - HbA1c (%, number)
         - Insulin Sensitivity (%, number)

      3. Heart Health (provide actual values, use 0 if not available):
         - Blood Pressure (mmHg, number)
         - Cholesterol (mg/dL, number)
         - Triglycerides (mg/dL, number)

      4. Essential Vitamins (provide actual values, use 0 if not available):
         - Vitamin D (ng/mL, number)
         - B12 (pg/mL, number)
         - Iron (µg/dL, number)

      5. Inflammation & Minerals (provide actual values, use 0 if not available):
         - CRP (mg/L, number)
         - Magnesium (mg/dL, number)
         - Zinc (µg/dL, number)

      6. Priority Action Plan (list specific actions):
         - Short Term (immediate actions)
         - Medium Term (next 3-6 months)
         - Long Term (6+ months)

      7. Red Flags (categorize issues):
         - Critical (immediate attention needed)
         - Warning (monitor closely)
         - Attention (keep track of)

      8. Success Tracking:
         - Key Metrics (specific measurements to track)
         - Milestones (achievement targets)
         - Recommendations (ongoing suggestions)

      Report text:
      ${text}

      IMPORTANT: 
      1. Respond ONLY with valid JSON.
      2. All numerical values must be numbers (not strings or null).
      3. If a measurement is not available, use 0 instead of null.
      4. The response must be a single JSON object that matches this exact structure:
      {
        "lifestyleFactors": {
          "sleep": number,
          "stress": number,
          "exercise": number,
          "hydration": number
        },
        "bloodSugarControl": {
          "fastingGlucose": number,
          "hba1c": number,
          "insulinSensitivity": number
        },
        "heartHealth": {
          "bloodPressure": number,
          "cholesterol": number,
          "triglycerides": number
        },
        "essentialVitamins": {
          "vitaminD": number,
          "b12": number,
          "iron": number
        },
        "inflammationAndMinerals": {
          "crp": number,
          "magnesium": number,
          "zinc": number
        },
        "priorityActionPlan": {
          "shortTerm": string[],
          "mediumTerm": string[],
          "longTerm": string[]
        },
        "redFlags": {
          "critical": string[],
          "warning": string[],
          "attention": string[]
        },
        "successTracking": {
          "keyMetrics": string[],
          "milestones": string[],
          "recommendations": string[]
        }
      }`;

      const maxRetries = 3;
      let attempt = 0;
      let lastError = null;

      while (attempt < maxRetries) {
        try {
          if (attempt > 0) {
            const delay = Math.pow(2, attempt) * 1000;
            logger.info(`Retry attempt ${attempt + 1}/${maxRetries}`, { delay });
            await new Promise(resolve => setTimeout(resolve, delay));
          }

          logger.info('Sending request to OpenAI API', { attempt: attempt + 1 });
          const completion = await this.openai.chat.completions.create({
            model: this.model,
            messages: [
              {
                role: "system",
                content: "You are a nutrition analysis expert. Provide analysis in JSON format only."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            temperature: 0.7,
            max_tokens: 2000,
            response_format: { type: "json_object" }
          });

          if (!completion.choices?.[0]?.message?.content) {
            throw new Error('Invalid response from OpenAI API');
          }

          logger.info('Received response from OpenAI API');
          const analysis = JSON.parse(completion.choices[0].message.content);
          
          logger.info('Validating analysis response');
          this.validateAnalysis(analysis);
          
          logger.info('Analysis completed successfully');
          await this.logAnalysis(analysis);
          return analysis;

        } catch (error) {
          logger.error(`Attempt ${attempt + 1} failed`, { 
            error: error.message, 
            stack: error.stack 
          });
          lastError = error;
          attempt++;
        }
      }

      throw new Error(`Failed to analyze nutrition data after ${maxRetries} attempts. Last error: ${lastError?.message}`);

    } catch (error) {
      logger.error('Text analysis failed', { 
        error: error.message, 
        stack: error.stack 
      });
      await this.logAnalysis(null, error);
      throw new Error(`Failed to analyze text: ${error.message}`);
    }
  }

  async analyzePDF(filePath) {
    logger.info('Starting PDF analysis', { filePath });
    try {
      if (!filePath || typeof filePath !== 'string') {
        throw new Error('Invalid file path: must be a non-empty string');
      }

      const text = await this.extractTextFromPDF(filePath);
      const analysis = await this.analyzeText(text);
      
      const analysisId = Date.now().toString();
      logger.info('Storing analysis in history', { analysisId });
      this.analysisHistory.set(analysisId, analysis);
      
      logger.info('PDF analysis completed successfully', { analysisId });
      return analysis;
    } catch (error) {
      logger.error('PDF analysis failed', { 
        error: error.message, 
        stack: error.stack,
        filePath 
      });
      throw new Error(`Failed to analyze PDF: ${error.message}`);
    }
  }

  async analyzePDFs(filePaths) {
    logger.info('Starting multiple PDF analysis', { numFiles: filePaths.length });
    try {
      if (!Array.isArray(filePaths) || filePaths.length === 0) {
        logger.warn('Invalid file paths array', { filePaths });
        throw new Error('Invalid file paths: must be a non-empty array');
      }

      logger.info('Extracting text from PDFs', { numFiles: filePaths.length });
      const texts = await Promise.all(
        filePaths.map(filePath => this.extractTextFromPDF(filePath))
      );

      logger.info('Combining PDF texts');
      const combinedText = texts.join('\n\n---\n\n');
      
      logger.info('Analyzing combined text', { textLength: combinedText.length });
      const analysis = await this.analyzeText(combinedText);
      
      const analysisId = Date.now().toString();
      logger.info('Storing combined analysis in history', { analysisId, analysisKeys: Object.keys(analysis) });
      this.analysisHistory.set(analysisId, analysis);
      logger.info('Analysis history size after set:', this.analysisHistory.size);
      
      logger.info('Multiple PDF analysis completed successfully', { analysisId });
      return analysis;
    } catch (error) {
      logger.error('Multiple PDF analysis failed', { 
        error: error.message, 
        stack: error.stack,
        numFiles: filePaths.length 
      });
      throw new Error(`Failed to analyze PDFs: ${error.message}`);
    }
  }

  getLatestAnalysis() {
    logger.info('Retrieving latest analysis');
    try {
      if (this.analysisHistory.size === 0) {
        logger.info('No analysis history available. Map size:', this.analysisHistory.size);
        return null;
      }
      const entries = Array.from(this.analysisHistory.entries());
      const latest = entries[entries.length - 1][1];
      logger.info('Latest analysis retrieved successfully', { analysisId: entries[entries.length - 1][0], analysisKeys: Object.keys(latest) });
      return latest;
    } catch (error) {
      logger.error('Failed to get latest analysis', { 
        error: error.message, 
        stack: error.stack 
      });
      return null;
    }
  }

  getAnalysisById(id) {
    logger.info('Retrieving analysis by ID', { id });
    try {
      const analysis = this.analysisHistory.get(id);
      if (!analysis) {
        logger.warn('Analysis not found', { id });
        return null;
      }
      logger.info('Analysis retrieved successfully', { id });
      return analysis;
    } catch (error) {
      logger.error('Failed to get analysis by ID', { 
        error: error.message, 
        stack: error.stack,
        id 
      });
      return null;
    }
  }

  async getAnalysisHistory() {
    logger.info('Retrieving analysis history');
    try {
      const history = Array.from(this.analysisHistory.entries()).map(([id, analysis]) => ({
        id,
        timestamp: new Date(parseInt(id)).toISOString(),
        analysis
      }));
      logger.info('Analysis history retrieved successfully', { 
        numEntries: history.length 
      });
      return history;
    } catch (error) {
      logger.error('Failed to get analysis history', { 
        error: error.message, 
        stack: error.stack 
      });
      return [];
    }
  }

  deleteAnalysis(id) {
    logger.info('Deleting analysis', { id });
    try {
      const success = this.analysisHistory.delete(id);
      if (success) {
        logger.info('Analysis deleted successfully', { id });
      } else {
        logger.warn('Analysis not found for deletion', { id });
      }
      return success;
    } catch (error) {
      logger.error('Failed to delete analysis', { 
        error: error.message, 
        stack: error.stack,
        id 
      });
      return false;
    }
  }
}

module.exports = { NutritionAnalyzer };
