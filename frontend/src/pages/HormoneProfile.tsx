
import React, { useState } from 'react';
import { FileUpload } from '@/components/ui/file-upload';
import { useToast } from '@/hooks/use-toast';
import { ChartCard } from '@/components/visualizations/ChartCard';
import { MetricCardGrid } from '@/components/visualizations/MetricCardGrid';
import { Droplet, ArrowDown, ArrowUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample hormone profile data
const hormoneMetrics = [
  { 
    title: 'Testosterone (Total)', 
    value: '546', 
    unit: 'ng/dL', 
    change: 12, 
    status: 'normal' as const,
    description: 'Within optimal range',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
  },
  { 
    title: 'Estradiol', 
    value: '42', 
    unit: 'pg/mL', 
    status: 'normal' as const,
    description: 'Within reference range'
  },
  { 
    title: 'Cortisol (Morning)', 
    value: '18.2', 
    unit: 'μg/dL', 
    status: 'normal' as const,
    description: 'Healthy stress response'
  },
  { 
    title: 'DHEA-S', 
    value: '285', 
    unit: 'μg/dL', 
    change: -5, 
    status: 'normal' as const,
    description: 'Normal range'
  },
  { 
    title: 'Thyroid (TSH)', 
    value: '2.1', 
    unit: 'mIU/L', 
    status: 'normal' as const,
    description: 'Optimal thyroid function'
  },
  { 
    title: 'Vitamin D', 
    value: '38', 
    unit: 'ng/mL', 
    change: 15, 
    status: 'normal' as const,
    description: 'Was low, now optimal'
  }
];

// Sample hormone balance chart data
const hormoneBalance = [
  { category: 'Testosterone', actual: 546, low: 300, high: 950, optimal: [500, 800] },
  { category: 'Estradiol', actual: 42, low: 10, high: 50, optimal: [20, 45] },
  { category: 'Cortisol AM', actual: 18.2, low: 10, high: 25, optimal: [15, 23] },
  { category: 'DHEA-S', actual: 285, low: 100, high: 500, optimal: [200, 400] },
  { category: 'TSH', actual: 2.1, low: 0.4, high: 4.5, optimal: [1, 3] },
  { category: 'Vitamin D', actual: 38, low: 20, high: 80, optimal: [30, 60] }
];

// Sample historical hormone data
const hormoneHistory = [
  { month: 'Dec', testosterone: 480, cortisol: 20.5, dhea: 270 },
  { month: 'Jan', testosterone: 495, cortisol: 19.8, dhea: 275 },
  { month: 'Feb', testosterone: 510, cortisol: 19.1, dhea: 280 },
  { month: 'Mar', testosterone: 525, cortisol: 18.6, dhea: 282 },
  { month: 'Apr', testosterone: 546, cortisol: 18.2, dhea: 285 }
];

const HormoneProfilePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
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
        description: "Your Hormone Profile report has been successfully analyzed.",
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
          reportType="Hormone Profile"
          isLoading={isLoading}
        />
      ) : (
        <div className="space-y-8 animate-fade-in">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-health-blue-dark flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                Hormone Profile Analysis
              </h2>
              <p className="text-gray-500 text-sm">
                From report: {file?.name} - Analysis date: May 18, 2025
              </p>
            </div>
            <Button variant="outline" onClick={resetAnalysis}>
              Analyze New Report
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-2 bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg">
              <CardHeader>
                <CardTitle>Hormone Balance Overview</CardTitle>
                <CardDescription className="text-white/80">
                  Your hormone levels are generally well balanced
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Your hormone profile shows optimal balance with all major hormones within healthy ranges. 
                  Recent improvements in Vitamin D and Testosterone levels indicate positive response to lifestyle changes.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge className="bg-emerald-400/80 hover:bg-emerald-400/90">Balanced</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30">Testosterone ↑</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30">Vitamin D ↑</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30">Cortisol ↓</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full flex flex-col justify-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-center text-lg">Hormone Balance Score</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="#e2e8f0" 
                      strokeWidth="10" 
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="#8b5cf6" 
                      strokeWidth="10" 
                      strokeDasharray="282.7" 
                      strokeDashoffset="31.1" 
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)" 
                    />
                    <text 
                      x="50" 
                      y="50" 
                      textAnchor="middle" 
                      dominantBaseline="middle"
                      fontWeight="bold" 
                      fontSize="24"
                      fill="#1e293b"
                    >
                      89%
                    </text>
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-100">
            <div className="flex gap-1 p-4 overflow-x-auto">
              <Button 
                variant={activeSection === 'overview' ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveSection('overview')}
              >
                Overview
              </Button>
              <Button 
                variant={activeSection === 'trends' ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveSection('trends')}
              >
                Trends
              </Button>
              <Button 
                variant={activeSection === 'balance' ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveSection('balance')}
              >
                Hormone Balance
              </Button>
              <Button 
                variant={activeSection === 'recommendations' ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveSection('recommendations')}
              >
                Recommendations
              </Button>
            </div>

            <div className="p-4 pt-0">
              {activeSection === 'overview' && (
                <div className="animate-fade-in">
                  <MetricCardGrid 
                    title="Key Hormone Metrics" 
                    metrics={hormoneMetrics}
                  />
                </div>
              )}

              {activeSection === 'trends' && (
                <div className="space-y-6 animate-fade-in">
                  <ChartCard
                    title="Hormone Levels Over Time"
                    description="5-month trend of key hormones"
                    data={hormoneHistory}
                    chartType="line"
                    xKey="month"
                    yKeys={[
                      { key: 'testosterone', name: 'Testosterone (ng/dL)', color: '#8b5cf6' },
                      { key: 'cortisol', name: 'Cortisol (μg/dL)', color: '#06b6d4' },
                      { key: 'dhea', name: 'DHEA-S (μg/dL)', color: '#f97316' }
                    ]}
                  />
                </div>
              )}

              {activeSection === 'balance' && (
                <div className="animate-fade-in">
                  <h3 className="font-medium text-lg mb-3">Hormone Range Analysis</h3>
                  <div className="space-y-4">
                    {hormoneBalance.map((item) => (
                      <div key={item.category} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-sm">{item.category}</span>
                          <span className="text-sm text-gray-500">{item.actual} {item.category === 'Testosterone' ? 'ng/dL' : item.category === 'TSH' ? 'mIU/L' : 'μg/dL'}</span>
                        </div>
                        <div className="h-4 bg-gray-200 rounded-full overflow-hidden relative">
                          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-gray-300 to-gray-400" 
                               style={{ 
                                 width: `${(item.low / item.high) * 100}%`, 
                                 opacity: 0.7 
                               }}></div>
                          <div className="absolute inset-y-0 right-0 bg-gradient-to-l from-gray-300 to-gray-400" 
                               style={{ 
                                 width: `${((item.high - item.optimal[1]) / item.high) * 100}%`, 
                                 opacity: 0.7 
                               }}></div>
                          <div className="absolute inset-y-0 bg-gradient-to-r from-green-200 to-green-400" 
                               style={{ 
                                 left: `${(item.optimal[0] / item.high) * 100}%`, 
                                 width: `${((item.optimal[1] - item.optimal[0]) / item.high) * 100}%` 
                               }}></div>
                          <div className="absolute inset-y-0 w-1.5 bg-blue-600 rounded" 
                               style={{ 
                                 left: `calc(${(item.actual / item.high) * 100}% - 3px)`, 
                               }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Low: {item.low}</span>
                          <span className="text-green-600">Optimal: {item.optimal[0]}-{item.optimal[1]}</span>
                          <span>High: {item.high}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'recommendations' && (
                <div className="space-y-5 animate-fade-in">
                  <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-purple-800 mb-1">Lifestyle Recommendations</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <ArrowUp className="h-4 w-4 text-green-600 mt-1 mr-2 shrink-0" />
                          <span>Continue with strength training 3x weekly to maintain optimal testosterone levels</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowDown className="h-4 w-4 text-amber-600 mt-1 mr-2 shrink-0" />
                          <span>Consider reducing evening screen time to optimize cortisol rhythm</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowUp className="h-4 w-4 text-green-600 mt-1 mr-2 shrink-0" />
                          <span>Regular sun exposure (15-20 min/day) has helped improve Vitamin D levels</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-blue-800 mb-1">Nutritional Support</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <Droplet className="h-4 w-4 text-blue-600 mt-1 mr-2 shrink-0" />
                          <span>Maintain zinc intake (oysters, pumpkin seeds, beef) for testosterone support</span>
                        </li>
                        <li className="flex items-start">
                          <Droplet className="h-4 w-4 text-blue-600 mt-1 mr-2 shrink-0" />
                          <span>Consider magnesium-rich foods (dark chocolate, avocados, nuts) for stress management</span>
                        </li>
                        <li className="flex items-start">
                          <Droplet className="h-4 w-4 text-blue-600 mt-1 mr-2 shrink-0" />
                          <span>Omega-3 fatty acids from fatty fish can help maintain hormonal balance</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-amber-500">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-amber-800 mb-1">Follow-up Recommendations</h3>
                      <div className="flex items-start">
                        <AlertCircle className="h-4 w-4 text-amber-600 mt-1 mr-2 shrink-0" />
                        <div>
                          <p className="text-gray-700">Schedule your next hormone panel in 6 months to monitor trends</p>
                          <p className="text-gray-500 text-sm mt-1">Consider testing in the morning (7-9am) for most accurate cortisol assessment</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HormoneProfilePage;
