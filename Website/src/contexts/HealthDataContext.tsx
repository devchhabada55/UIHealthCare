import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { PhysicalHealthData, MentalHealthData, NutritionData, SleepData, HealthType } from '../types/health';

interface HealthDataContextType {
  physicalHealthData: PhysicalHealthData | null;
  mentalHealthData: MentalHealthData | null;
  nutritionData: NutritionData | null;
  sleepData: SleepData | null;
  loading: boolean;
  error: string | null;
  analyzePDF: (pdfId: string, healthType: HealthType) => Promise<void>;
  analyzeAllPDFs: () => Promise<void>;
  deletePDF: (id: string) => Promise<void>;
  deleteAllPDFs: () => Promise<void>;
  refreshData: () => Promise<void>;
  setCurrentPdfId: (id: string | null) => void;
  setPhysicalHealthData: React.Dispatch<React.SetStateAction<PhysicalHealthData | null>>;
  setMentalHealthData: React.Dispatch<React.SetStateAction<MentalHealthData | null>>;
  setNutritionData: React.Dispatch<React.SetStateAction<NutritionData | null>>;
  setSleepData: React.Dispatch<React.SetStateAction<SleepData | null>>;
}

const HealthDataContext = createContext<HealthDataContextType | undefined>(undefined);

export const useHealthData = () => {
  const context = useContext(HealthDataContext);
  if (!context) {
    throw new Error('useHealthData must be used within a HealthDataProvider');
  }
  return context;
};

export const HealthDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [physicalHealthData, setPhysicalHealthData] = useState<PhysicalHealthData | null>(null);
  const [mentalHealthData, setMentalHealthData] = useState<MentalHealthData | null>(null);
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [sleepData, setSleepData] = useState<SleepData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setCurrentPdfId] = useState<string | null>(null);
  const { toast } = useToast();

  const saveToCache = (data: any) => {
    try {
      localStorage.setItem('healthData', JSON.stringify(data));
    } catch (err) {
      console.error('Error saving to cache:', err);
    }
  };

  // const clearCache = () => {
  //   try {
  //     localStorage.removeItem('healthData');
  //   } catch (err) {
  //     console.error('Error clearing cache:', err);
  //   }
  // };

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch mental health data
      try {
        const mentalHealthResponse = await fetch('http://localhost:5000/api/mental-health');
        if (mentalHealthResponse.ok) {
          const mentalHealthResult = await mentalHealthResponse.json();
          console.log('Mental Health API Response:', mentalHealthResult);
          
          if (mentalHealthResult.success && mentalHealthResult.analysis) {
            console.log('Setting Mental Health Data:', mentalHealthResult.analysis);
            setMentalHealthData(mentalHealthResult.analysis);
          }
        }
      } catch (err) {
        console.warn('Could not fetch mental health data:', err);
      }

      // Fetch physical health data
      try {
        const physicalHealthResponse = await fetch('http://localhost:5000/api/physical-health');
        if (physicalHealthResponse.ok) {
          const physicalHealthResult = await physicalHealthResponse.json();
          if (physicalHealthResult.success && physicalHealthResult.analysis) {
            setPhysicalHealthData(physicalHealthResult.analysis);
          }
        }
      } catch (err) {
        console.warn('Could not fetch physical health data:', err);
      }

      // Fetch nutrition data
      try {
        const nutritionResponse = await fetch('http://localhost:5000/api/nutrition');
        if (nutritionResponse.ok) {
          const nutritionResult = await nutritionResponse.json();
          if (nutritionResult.success && nutritionResult.analysis) {
            setNutritionData(nutritionResult.analysis);
          }
        }
      } catch (err) {
        console.warn('Could not fetch nutrition data:', err);
      }

      // Fetch sleep data
      try {
        const sleepResponse = await fetch('http://localhost:5000/api/sleep');
        if (sleepResponse.ok) {
          const sleepResult = await sleepResponse.json();
          if (sleepResult.success && sleepResult.analysis) {
            setSleepData(sleepResult.analysis);
          }
        }
      } catch (err) {
        console.warn('Could not fetch sleep data:', err);
      }

      // Save to cache only if we have any data
      const cacheData = {
        mentalHealthData: mentalHealthData,
        physicalHealthData: physicalHealthData,
        nutritionData: nutritionData,
        sleepData: sleepData
      };

      if (Object.values(cacheData).some(data => data !== null)) {
        saveToCache(cacheData);
      }

    } catch (err) {
      console.error('Error refreshing data:', err);
      setError(err instanceof Error ? err.message : 'Failed to refresh data');
      toast({
        description: err instanceof Error ? err.message : 'Failed to refresh data',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const analyzePDF = async (pdfId: string, healthType: HealthType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/${healthType}/analyze/${pdfId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to analyze ${healthType} PDF`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || `Failed to analyze ${healthType} PDF`);
      }

      // Update the appropriate state based on health type
      switch (healthType) {
        case 'mental-health':
          setMentalHealthData(result.analysis);
          break;
        case 'physical-health':
          setPhysicalHealthData(result.analysis);
          break;
        case 'nutrition':
          setNutritionData(result.analysis);
          break;
        case 'sleep':
          setSleepData(result.analysis);
          break;
      }

      toast({
        description: `${healthType} analysis completed successfully`
      });

      await refreshData();
    } catch (err) {
      console.error(`Error analyzing ${healthType} PDF:`, err);
      setError(err instanceof Error ? err.message : `Failed to analyze ${healthType} PDF`);
      toast({
        description: err instanceof Error ? err.message : `Failed to analyze ${healthType} PDF`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const analyzeAllPDFs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/analyze-all', {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze all PDFs');
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to analyze all PDFs');
      }

      toast({
        description: "All PDFs analyzed successfully"
      });

      await refreshData();
    } catch (err) {
      console.error('Error analyzing all PDFs:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze all PDFs');
      toast({
        description: err instanceof Error ? err.message : 'Failed to analyze all PDFs',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deletePDF = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/pdfs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete PDF');
      }

      await refreshData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete PDF');
      throw err;
    }
  };

  const deleteAllPDFs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pdfs', {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete all PDFs');
      }

      await refreshData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete all PDFs');
      throw err;
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const value: HealthDataContextType = {
    physicalHealthData,
    mentalHealthData,
    nutritionData,
    sleepData,
    loading,
    error,
    analyzePDF,
    analyzeAllPDFs,
    deletePDF,
    deleteAllPDFs,
    refreshData,
    setCurrentPdfId,
    setPhysicalHealthData,
    setMentalHealthData,
    setNutritionData,
    setSleepData,
  };

  return (
    <HealthDataContext.Provider value={value}>
      {children}
    </HealthDataContext.Provider>
  );
};

export const useAnalyzePDF = () => {
  const context = useContext(HealthDataContext);
  if (!context) {
    throw new Error('useAnalyzePDF must be used within a HealthDataProvider');
  }
  return context.analyzePDF;
};

export const useDeletePDF = () => {
  const context = useContext(HealthDataContext);
  if (!context) {
    throw new Error('useDeletePDF must be used within a HealthDataProvider');
  }
  return context.deletePDF;
};

export const useDeleteAllPDFs = () => {
  const context = useContext(HealthDataContext);
  if (!context) {
    throw new Error('useDeleteAllPDFs must be used within a HealthDataProvider');
  }
  return context.deleteAllPDFs;
}; 

