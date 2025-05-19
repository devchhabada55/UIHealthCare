import React, { useState } from 'react';
import { FileUpload } from '@/components/ui/file-upload';
import { MetricCardGrid } from '@/components/visualizations/MetricCardGrid';
import { ChartCard } from '@/components/visualizations/ChartCard';
import { User, Scale, Ruler } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Sample body composition data
const bodyCompositionMetrics = [
  { 
    title: 'Body Fat Percentage', 
    value: '22.4', 
    unit: '%', 
    change: -1.2, 
    status: 'normal' as const,
    description: 'In normal range for your age and gender',
    icon: <User size={20} />
  },
  { 
    title: 'Weight', 
    value: '175.5', 
    unit: 'lbs', 
    change: -0.8, 
    status: 'normal' as const,
    icon: <Scale size={20} />
  },
  { 
    title: 'Height', 
    value: '5\'10"', 
    unit: '', 
    status: 'normal' as const,
    icon: <Ruler size={20} />
  },
  { 
    title: 'BMI', 
    value: '24.2', 
    unit: '', 
    change: -0.5, 
    status: 'normal' as const,
    description: 'Normal weight range'
  },
  { 
    title: 'Visceral Fat', 
    value: '7', 
    unit: '', 
    change: -1, 
    status: 'good' as const,
    description: 'Healthy range is below 10'
  },
  { 
    title: 'Lean Body Mass', 
    value: '136.2', 
    unit: 'lbs', 
    change: 0.3, 
    status: 'good' as const
  }
];

// Sample chart data
const bodyCompositionHistory = [
  { date: 'Jan 2025', bodyFat: 25.3, weight: 182 },
  { date: 'Feb 2025', bodyFat: 24.8, weight: 180 },
  { date: 'Mar 2025', bodyFat: 23.6, weight: 178 },
  { date: 'Apr 2025', bodyFat: 22.9, weight: 177 },
  { date: 'May 2025', bodyFat: 22.4, weight: 175.5 },
];

const BodyCompositionPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setIsAnalyzed(false);
  };

  const handleAnalyze = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      setIsLoading(false);
      setIsAnalyzed(true);
      toast({
        title: "Analysis Complete",
        description: "Your Body Composition report has been successfully analyzed.",
      });
    }, 2500);
  };

  return (
    <div className="space-y-8 pb-12">
      {!isAnalyzed ? (
        <FileUpload 
          onFileSelect={handleFileSelect}
          onAnalyze={handleAnalyze}
          reportType="Body Composition"
          isLoading={isLoading}
        />
      ) : (
        <div className="space-y-10 animate-fade-in">
          <Card className="bg-gradient-to-r from-health-blue to-health-blue-light text-white">
            <CardHeader>
              <CardTitle>Body Composition Summary</CardTitle>
              <CardDescription className="text-white/80">
                Analysis from {file?.name} - May 18, 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                Your body composition measurements are mostly within normal ranges. 
                There has been a positive trend in reducing body fat percentage and visceral fat 
                while maintaining lean body mass.
              </p>
            </CardContent>
          </Card>
          
          <MetricCardGrid 
            title="Key Measurements" 
            metrics={bodyCompositionMetrics} 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Body Composition Trend"
              description="Changes over the last 5 months"
              data={bodyCompositionHistory}
              chartType="line"
              xKey="date"
              yKeys={[
                { key: 'bodyFat', name: 'Body Fat %', color: '#f97316' },
                { key: 'weight', name: 'Weight (lbs)', color: '#1a73e8' }
              ]}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Body Composition Analysis</CardTitle>
                <CardDescription>
                  Key insights from your latest assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-health-blue-dark mb-1">Positive Findings</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Body fat percentage decreased by 1.2% since last measurement</li>
                      <li>Visceral fat has reduced by 1 point, indicating improved metabolic health</li>
                      <li>Lean body mass has been maintained during weight loss</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-health-blue-dark mb-1">Recommendations</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Continue with current exercise regimen to maintain lean muscle</li>
                      <li>Consider slight increase in protein intake (0.8-1g per lb of bodyweight)</li>
                      <li>Focus on strength training 2-3 times per week</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyCompositionPage;
