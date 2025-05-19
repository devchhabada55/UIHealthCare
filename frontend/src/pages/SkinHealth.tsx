
import React, { useState } from 'react';
import { FileUpload } from "@/components/ui/file-upload";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle, Calendar, Info } from "lucide-react";
import { 
  Chart,
  ChartTitle,
  ChartLegend,
  ChartTooltip,
  ChartGrid,
  ChartXAxis,
  ChartYAxis,
  ChartLineSeries,
} from '@/components/ui/chart';
import { ChartContainer } from '@/components/ui/chart-container';

interface SkinHealthPageProps {
  reportType?: string;
}

const SkinHealthPage = ({ reportType = "Skin Health" }: SkinHealthPageProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleAnalyze = () => {
    if (!file) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsAnalyzed(true);
    }, 1500);
  };

  // Sample data for skin health metrics
  const skinData = [
    { name: "Hydration", value: 76, target: 85, color: "#4AAEFF" },
    { name: "Elasticity", value: 68, target: 80, color: "#FF7E54" },
    { name: "Collagen", value: 72, target: 85, color: "#54CC94" },
    { name: "UV Damage", value: 25, target: 15, color: "#FFB547" },
    { name: "Pore Health", value: 83, target: 90, color: "#A78BFA" }
  ];

  // Time series data for skin health trends
  const trendData = [
    { date: "Jan", hydration: 65, elasticity: 60, collagen: 60 },
    { date: "Feb", hydration: 68, elasticity: 63, collagen: 62 },
    { date: "Mar", hydration: 67, elasticity: 65, collagen: 65 },
    { date: "Apr", hydration: 70, elasticity: 66, collagen: 67 },
    { date: "May", hydration: 72, elasticity: 67, collagen: 69 },
    { date: "Jun", hydration: 75, elasticity: 68, collagen: 70 },
    { date: "Jul", hydration: 76, elasticity: 68, collagen: 72 },
  ];

  return (
    <div className="space-y-8">
      <FileUpload
        onFileSelect={handleFileSelect}
        onAnalyze={handleAnalyze}
        reportType={reportType}
        isLoading={isLoading}
      />
      
      {isAnalyzed && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-health-blue-dark mb-1">{reportType} Summary</h2>
                    <p className="text-sm text-gray-500">Overall skin health score: 74/100</p>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Last 6 months
                  </Button>
                </div>
                
                <Tabs defaultValue="trends">
                  <TabsList className="mb-4">
                    <TabsTrigger value="trends">Trends</TabsTrigger>
                    <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="trends" className="h-[300px]">
                    <Chart>
                      <ChartContainer type="line" data={trendData}>
                        <ChartTitle>Skin Health Trends</ChartTitle>
                        <ChartLegend />
                        <ChartGrid />
                        <ChartTooltip />
                        <ChartXAxis dataKey="date" />
                        <ChartYAxis />
                        <ChartLineSeries
                          data={trendData}
                          dataKey="date"
                          valueKey="hydration"
                          name="Hydration"
                          strokeColor="#4AAEFF"
                        />
                        <ChartLineSeries
                          data={trendData}
                          dataKey="date"
                          valueKey="elasticity"
                          name="Elasticity"
                          strokeColor="#FF7E54"
                        />
                        <ChartLineSeries
                          data={trendData}
                          dataKey="date"
                          valueKey="collagen"
                          name="Collagen"
                          strokeColor="#54CC94"
                        />
                      </ChartContainer>
                    </Chart>
                  </TabsContent>
                  
                  <TabsContent value="metrics">
                    <div className="space-y-4">
                      {skinData.map(item => (
                        <div key={item.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm">{item.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold" style={{ color: item.color }}>{item.value}%</span>
                              <span className="text-xs text-gray-400">Target: {item.target}%</span>
                            </div>
                          </div>
                          <Progress value={item.value} className="h-2" indicatorColor={item.color} />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-health-blue-dark mb-4">Key Insights</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-green-100 text-green-600 mt-0.5">
                      <ArrowRightCircle className="h-4 w-4" />
                    </div>
                    <span className="text-sm">Hydration levels have improved by 11% since last assessment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-amber-100 text-amber-600 mt-0.5">
                      <Info className="h-4 w-4" />
                    </div>
                    <span className="text-sm">UV damage remains above recommended threshold</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mt-0.5">
                      <Info className="h-4 w-4" />
                    </div>
                    <span className="text-sm">Collagen production shows steady improvement</span>
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium mb-3">Recommendations</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">• Increase water intake to 3L daily</p>
                    <p className="text-sm text-gray-600">• Apply SPF 50 sunscreen daily</p>
                    <p className="text-sm text-gray-600">• Consider collagen supplements</p>
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

export default SkinHealthPage;
