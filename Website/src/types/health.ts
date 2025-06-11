export interface PhysicalHealthData {
  keyFindings?: string;
  primaryGoal?: string;
  recommendations?: string[];
  phaseAngle?: number;
  vo2max?: number;
  bodyComposition?: {
    bodyFat?: number;
    muscleMass?: number;
    hydration?: number;
  };
  strengthAssessment?: {
    upperBody?: string;
    lowerBody?: string;
    core?: string;
  };
  currentActivity?: {
    type?: string;
    intensity?: string;
    frequency?: string;
  };
  approach?: string;
  additionalNotes?: string[];
  chartData?: {
    labels?: string[];
    datasets?: Array<{
      label?: string;
      data?: number[];
    }>;
  };
}

export interface MentalHealthData {
  keyFindings?: string;
  stressAndRecoveryBalance?: {
    value?: number;
    unit?: string;
    description?: string;
  };
  cognitivePerformance?: {
    value?: number;
    unit?: string;
    description?: string;
  };
  emotionalWellbeing: {
    description: string;
    measurements: {
      moodStability: {
        value: number;
        unit: string;
      };
      emotionalRegulation: {
        value: number;
        unit: string;
      };
    };
  };
  mentalResilience: {
    description: string;
    metrics: {
      stressResponseProfile: {
        value: number;
        unit: string;
      };
      copingMechanisms: {
        value: number;
        unit: string;
      };
    };
  };
  currentMentalActivity: {
    level: string;
    patterns: string[];
    description: string;
  };
  primaryGoal: string;
  recommendations?: Array<{
    category?: string;
    suggestion?: string;
    priority: 'High' | 'Medium' | 'Low';
    timeframe: string;
    frequency: string;
    description: string;
  }>;
  additionalNotes: Array<{
    topic: string;
    explanation: string;
    severity: 'High' | 'Medium' | 'Low';
    action: string;
  }>;
}

export interface NutritionData {
  lifestyleFactors: {
    sleep: number;
    stress: number;
    exercise: number;
    hydration: number;
  };
  bloodSugarControl: {
    fastingGlucose: number;
    hba1c: number;
    insulinSensitivity: number;
  };
  heartHealth: {
    bloodPressure: number;
    cholesterol: number;
    triglycerides: number;
  };
  essentialVitamins: {
    vitaminD: number;
    b12: number;
    iron: number;
  };
  inflammationAndMinerals: {
    crp: number;
    magnesium: number;
    zinc: number;
  };
  priorityActionPlan: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  };
  redFlags: {
    critical: string[];
    warning: string[];
    attention: string[];
  };
  successTracking: {
    keyMetrics: string[];
    milestones: string[];
    recommendations: string[];
  };
}

export interface SleepData {
  keyFindings: string;
  sleepQuality: {
    value: number;
    unit: string;
    status: string;
    description: string;
  };
  sleepPatterns: {
    averageDuration: number;
    consistency: number;
    efficiency: number;
    status: string;
    description: string;
  };
  sleepStages: {
    deep: number;
    light: number;
    rem: number;
    awake: number;
    status: string;
    description: string;
  };
  sleepDisruptions: {
    frequency: number;
    duration: number;
    causes: string[];
    status: string;
    description: string;
  };
  approach: {
    sleepHygiene: string[];
    environment: string[];
    schedule: string[];
    habits: string[];
  };
  recommendations: Array<{
    category: string;
    suggestion: string;
    frequency: string;
    description: string;
    priority: string;
    timeframe: string;
  }>;
  additionalNotes: Array<{
    topic: string;
    explanation: string;
    severity: string;
    action: string;
  }>;
  chartData: {
    sleepMetrics: {
      labels: string[];
      values: number[];
      colors: string[];
    };
    sleepStages: {
      labels: string[];
      values: number[];
      colors: string[];
    };
  };
}

export type HealthType = 'mental-health' | 'physical-health' | 'nutrition' | 'sleep';

export interface HealthData {
  physicalHealth?: PhysicalHealthData;
  mentalHealth?: MentalHealthData;
  nutrition?: NutritionData;
  sleep?: SleepData;
} 