
import React, { useState } from 'react';
import { FileUpload } from "@/components/ui/file-upload";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Chart,
  ChartTitle,
  ChartTooltip,
  ChartGrid,
  ChartLegend,
  ChartXAxis,
  ChartYAxis,
  ChartLineSeries,
  ChartRadarSeries,
} from '@/components/ui/chart';
import { ChartContainer } from '@/components/ui/chart-container';
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Heart, ArrowUpCircle, TrendingUp, Clock, Calendar } from "lucide-react";

const PhysicalFitnessPage = () => {
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

  // Sample data for fitness metrics
  const strengthData = [
    { category: "Upper Body", value: 78, previous: 72 },
    { category: "Lower Body", value: 85, previous: 80 },
    { category: "Core", value: 62, previous: 55 },
    { category: "Flexibility", value: 55, previous: 50 },
    { category: "Balance", value: 70, previous: 68 },
  ];

  const cardioData = [
    { date: "Jan", vo2max: 42, recovery: 76 },
    { date: "Feb", vo2max: 42.5, recovery: 77 },
    { date: "Mar", vo2max: 43.2, recovery: 79 },
    { date: "Apr", vo2max: 43.8, recovery: 81 },
    { date: "May", vo2max: 44.1, recovery: 82 },
    { date: "Jun", vo2max: 45.2, recovery: 84 },
    { date: "Jul", vo2max: 46, recovery: 85 },
  ];

  const statsData = [
    { label: "VO2 Max", value: 46, unit: "ml/kg/min", status: "Excellent" },
    { label: "Recovery Rate", value: 85, unit: "percent", status: "Above Average" },
    { label: "Resting HR", value: 62, unit: "bpm", status: "Good" },
    { label: "Endurance", value: 78, unit: "percentile", status: "Above Average" },
  ];

  return (
    <div className="space-y-8">
      <FileUpload
        onFileSelect={handleFileSelect}
        onAnalyze={handleAnalyze}
        reportType="Physical Fitness"
        isLoading={isLoading}
      />
      
      {isAnalyzed && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {statsData.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <div className="flex items-baseline mt-1">
                        <h3 className="text-2xl font-bold text-health-blue-dark">{stat.value}</h3>
                        <span className="ml-1 text-xs text-gray-400">{stat.unit}</span>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        stat.status === "Excellent" ? "default" : 
                        stat.status === "Above Average" ? "secondary" : 
                        "outline"
                      }
                    >
                      {stat.status}
                    </Badge>
                  </div>
                  <div className="flex items-center mt-3 text-xs text-green-600">
                    <ArrowUpCircle className="h-3 w-3 mr-1" />
                    <span>+{index + 2}% from last assessment</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-bold text-health-blue-dark">Strength Profile</CardTitle>
                  <Dumbbell className="h-5 w-5 text-health-blue" />
                </div>
                <CardDescription>Comprehensive strength assessment</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <Chart>
                  <ChartContainer type="radar" data={strengthData}>
                    <ChartRadarSeries
                      data={strengthData}
                      dataKey="category"
                      valueKey="value"
                      name="Current"
                      stroke="#4AAEFF"
                      fill="#4AAEFF"
                      fillOpacity={0.2}
                    />
                    <ChartRadarSeries
                      data={strengthData}
                      dataKey="category"
                      valueKey="previous"
                      name="Previous"
                      stroke="#A78BFA"
                      fill="#A78BFA"
                      fillOpacity={0.1}
                    />
                    <ChartLegend />
                  </ChartContainer>
                </Chart>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-bold text-health-blue-dark">Cardio Performance</CardTitle>
                  <Heart className="h-5 w-5 text-health-blue" />
                </div>
                <CardDescription>VO2 Max & Recovery Trends</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <Chart>
                  <ChartContainer type="line" data={cardioData}>
                    <ChartTitle>Cardio Metrics Over Time</ChartTitle>
                    <ChartTooltip />
                    <ChartGrid />
                    <ChartXAxis dataKey="date" />
                    <ChartYAxis />
                    <ChartLineSeries
                      data={cardioData}
                      dataKey="date"
                      valueKey="vo2max"
                      name="VO2 Max"
                      strokeColor="#FF7E54"
                    />
                    <ChartLineSeries
                      data={cardioData}
                      dataKey="date"
                      valueKey="recovery"
                      name="Recovery"
                      strokeColor="#54CC94"
                    />
                    <ChartLegend />
                  </ChartContainer>
                </Chart>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold text-health-blue-dark">Training Recommendations</CardTitle>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Next 4 weeks
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <h4 className="font-medium">Strength Focus</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      <span>Increase core training frequency to 3x/week</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      <span>Add progressive overload to upper body exercises</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      <span>Incorporate functional movement patterns</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <Heart className="h-5 w-5 text-red-600" />
                    </div>
                    <h4 className="font-medium">Cardio Development</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      <span>Add 2 HIIT sessions per week</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      <span>Zone 2 training for 45-60 min twice weekly</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      <span>Monitor heart rate recovery metrics</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <h4 className="font-medium">Recovery Protocol</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      <span>Dedicated recovery day after intense workouts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      <span>10 min mobility work before each session</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      <span>Cold therapy for enhanced recovery</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PhysicalFitnessPage;
