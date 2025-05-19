
import React, { useState } from 'react';
import { FileUpload } from '@/components/ui/file-upload';
import { useToast } from '@/hooks/use-toast';
import { ChartCard } from '@/components/visualizations/ChartCard';
import { MetricCardGrid } from '@/components/visualizations/MetricCardGrid';
import { Heart, Activity, Clock, Scale } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Sample heart health data
const heartHealthMetrics = [
  { 
    title: 'Resting Heart Rate', 
    value: '68', 
    unit: 'bpm', 
    change: -3, 
    status: 'good' as const,
    description: 'Excellent range for your age',
    icon: <Heart size={20} />
  },
  { 
    title: 'Blood Pressure', 
    value: '118/78', 
    unit: 'mmHg', 
    status: 'normal' as const,
    description: 'Optimal range',
    icon: <Activity size={20} />
  },
  { 
    title: 'Heart Rate Recovery', 
    value: '28', 
    unit: 'bpm', 
    change: 2, 
    status: 'good' as const,
    description: 'Very good recovery rate',
    icon: <Clock size={20} />
  },
  { 
    title: 'Cholesterol (Total)', 
    value: '185', 
    unit: 'mg/dL', 
    change: -12, 
    status: 'normal' as const,
    description: 'Within normal range'
  },
  { 
    title: 'HDL Cholesterol', 
    value: '52', 
    unit: 'mg/dL', 
    change: 3, 
    status: 'good' as const,
    description: 'Good protective cholesterol'
  },
  { 
    title: 'LDL Cholesterol', 
    value: '110', 
    unit: 'mg/dL', 
    change: -15, 
    status: 'normal' as const,
    description: 'Near optimal range'
  }
];

// Sample heart rate data
const heartRateHistory = [
  { date: 'Jan', restingHR: 72, maxHR: 165, recovery: 26 },
  { date: 'Feb', restingHR: 71, maxHR: 168, recovery: 27 },
  { date: 'Mar', restingHR: 70, maxHR: 172, recovery: 27 },
  { date: 'Apr', restingHR: 69, maxHR: 170, recovery: 28 },
  { date: 'May', restingHR: 68, maxHR: 171, recovery: 28 },
];

// Sample blood pressure data
const bloodPressureHistory = [
  { date: 'Jan', systolic: 122, diastolic: 82 },
  { date: 'Feb', systolic: 120, diastolic: 80 },
  { date: 'Mar', systolic: 121, diastolic: 79 },
  { date: 'Apr', systolic: 119, diastolic: 78 },
  { date: 'May', systolic: 118, diastolic: 78 },
];

const HeartHealthPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
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
        description: "Your Heart Health report has been successfully analyzed.",
      });
    }, 1500);
  };

  const resetAnalysis = () => {
    setFile(null);
    setIsAnalyzed(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {!isAnalyzed ? (
        <FileUpload 
          onFileSelect={handleFileSelect}
          onAnalyze={handleAnalyze}
          reportType="Heart Health"
          isLoading={isLoading}
        />
      ) : (
        <div className="space-y-8 animate-fade-in">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-health-blue-dark flex items-center gap-2">
                <Heart className="text-red-500" size={24} />
                Heart Health Analysis
              </h2>
              <p className="text-gray-500 text-sm">
                From report: {file?.name} - Analysis date: May 18, 2025
              </p>
            </div>
            <Button variant="outline" onClick={resetAnalysis}>
              Analyze New Report
            </Button>
          </div>

          <Card className="bg-gradient-to-r from-red-500/90 to-red-400/80 text-white overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" /> 
                Cardiovascular Health Summary
              </CardTitle>
              <CardDescription className="text-white/80">
                Your heart health is in good condition with some recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <p className="mb-4">
                    Your cardiovascular metrics show healthy patterns with excellent heart rate recovery, 
                    indicating good fitness. Blood pressure is optimal, and cholesterol levels are 
                    well-managed with recent improvement in LDL levels.
                  </p>
                  
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                      View Full Report
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                      Download Summary
                    </Button>
                  </div>
                </div>
                <div className="w-full md:w-1/3 flex items-center justify-center px-4">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-white/30"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent transform rotate-45"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">86%</div>
                      <div className="text-sm font-medium">Heart Score</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex gap-2 mb-6 overflow-x-auto">
              <Button 
                variant={activeTab === 'summary' ? "default" : "outline"}
                onClick={() => setActiveTab('summary')}
              >
                Summary
              </Button>
              <Button 
                variant={activeTab === 'trends' ? "default" : "outline"}
                onClick={() => setActiveTab('trends')}
              >
                Trends
              </Button>
              <Button 
                variant={activeTab === 'recommendations' ? "default" : "outline"}
                onClick={() => setActiveTab('recommendations')}
              >
                Recommendations
              </Button>
            </div>
            
            {activeTab === 'summary' && (
              <div className="animate-fade-in">
                <MetricCardGrid 
                  title="Key Heart Health Metrics" 
                  metrics={heartHealthMetrics}
                />
              </div>
            )}
            
            {activeTab === 'trends' && (
              <div className="space-y-6 animate-fade-in">
                <ChartCard
                  title="Heart Rate Metrics Over Time"
                  description="Showing resting heart rate, max heart rate, and recovery rate trends"
                  data={heartRateHistory}
                  chartType="line"
                  xKey="date"
                  yKeys={[
                    { key: 'restingHR', name: 'Resting HR (bpm)', color: '#e11d48' },
                    { key: 'maxHR', name: 'Max HR (bpm)', color: '#f97316' },
                    { key: 'recovery', name: 'Recovery Rate (bpm)', color: '#22c55e' }
                  ]}
                />
                <ChartCard
                  title="Blood Pressure Trend"
                  description="Systolic and diastolic blood pressure readings"
                  data={bloodPressureHistory}
                  chartType="line"
                  xKey="date"
                  yKeys={[
                    { key: 'systolic', name: 'Systolic (mmHg)', color: '#3b82f6' },
                    { key: 'diastolic', name: 'Diastolic (mmHg)', color: '#8b5cf6' }
                  ]}
                />
              </div>
            )}
            
            {activeTab === 'recommendations' && (
              <div className="space-y-4 animate-fade-in">
                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-green-700 mb-1">Physical Activity</h3>
                    <p className="text-gray-600">
                      Your heart metrics indicate a good level of cardiovascular fitness. Continue 
                      with moderate-intensity exercise 3-5 times per week, aiming for 150 minutes 
                      total. Consider adding 1-2 high-intensity interval training sessions for 
                      additional cardiac benefits.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-blue-700 mb-1">Dietary Suggestions</h3>
                    <p className="text-gray-600">
                      Maintain your current intake of omega-3 fatty acids and fiber. Consider reducing 
                      sodium slightly to further optimize blood pressure. Your cholesterol management 
                      is excellent - continue eating heart-healthy foods like fatty fish, whole grains, 
                      nuts, and plenty of fruits and vegetables.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-amber-500">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-amber-700 mb-1">Lifestyle Factors</h3>
                    <p className="text-gray-600">
                      Your stress levels appear well-managed. Continue with stress-reduction 
                      techniques such as mindfulness or meditation. Ensure adequate sleep (7-8 hours) 
                      for optimal heart health. Consider reducing alcohol consumption to no more than 
                      1 drink per day for additional heart benefits.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-purple-700 mb-1">Follow-up Recommendations</h3>
                    <p className="text-gray-600">
                      Schedule your next cholesterol panel in 6 months to monitor the positive trend. 
                      Consider a cardiac stress test in the next 12 months as a baseline assessment. 
                      Continue monitoring blood pressure at home weekly.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeartHealthPage;
