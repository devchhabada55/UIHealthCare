
import React, { useState } from 'react';
import { FileUpload } from "@/components/ui/file-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Chart,
  ChartTitle,
  ChartTooltip,
  ChartGrid,
  ChartLegend,
  ChartXAxis,
  ChartYAxis,
  ChartBarSeries,
} from '@/components/ui/chart';
import { ChartContainer } from '@/components/ui/chart-container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Calendar, Download, Smile, Frown, Meh, Heart, Clock } from "lucide-react";

const WellbeingPage = () => {
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

  // Sample data for mental wellbeing assessment
  const stressData = [
    { name: "Low", value: 35, color: "#4ADE80" },
    { name: "Moderate", value: 45, color: "#FACC15" },
    { name: "High", value: 20, color: "#F87171" },
  ];

  const sleepData = [
    { day: "Mon", hours: 7.2, quality: 82 },
    { day: "Tue", hours: 6.5, quality: 74 },
    { day: "Wed", hours: 7.8, quality: 86 },
    { day: "Thu", hours: 6.9, quality: 79 },
    { day: "Fri", hours: 7.5, quality: 83 },
    { day: "Sat", hours: 8.2, quality: 89 },
    { day: "Sun", hours: 7.6, quality: 84 },
  ];

  const moodData = [
    { name: "Happy", percent: 42, icon: <Smile className="h-4 w-4 text-green-500" /> },
    { name: "Neutral", percent: 38, icon: <Meh className="h-4 w-4 text-amber-500" /> },
    { name: "Stressed", percent: 20, icon: <Frown className="h-4 w-4 text-red-500" /> },
  ];

  return (
    <div className="space-y-8">
      <FileUpload
        onFileSelect={handleFileSelect}
        onAnalyze={handleAnalyze}
        reportType="Wellbeing & Stress"
        isLoading={isLoading}
      />
      
      {isAnalyzed && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="w-full md:w-2/3">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl text-health-blue-dark">Wellbeing Assessment</CardTitle>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Past 7 days
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="sleep">
                  <TabsList className="mb-4 grid grid-cols-3 w-full">
                    <TabsTrigger value="sleep">Sleep</TabsTrigger>
                    <TabsTrigger value="stress">Stress</TabsTrigger>
                    <TabsTrigger value="balance">Work-Life</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="sleep" className="h-[300px]">
                    <Chart>
                      <ChartContainer type="bar" data={sleepData}>
                        <ChartTitle>Sleep Analysis</ChartTitle>
                        <ChartTooltip />
                        <ChartGrid />
                        <ChartXAxis dataKey="day" />
                        <ChartYAxis />
                        <ChartBarSeries
                          data={sleepData}
                          dataKey="day"
                          valueKey="hours"
                          name="Hours"
                          color="#A78BFA"
                        />
                      </ChartContainer>
                    </Chart>
                  </TabsContent>
                  
                  <TabsContent value="stress" className="h-[300px]">
                    <Chart>
                      <ChartContainer type="pie">
                        <ChartTitle>Stress Level Distribution</ChartTitle>
                        <ChartTooltip />
                        <ChartLegend />
                      </ChartContainer>
                    </Chart>
                  </TabsContent>
                  
                  <TabsContent value="balance" className="h-[300px]">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-full">
                          <div className="relative">
                            <svg className="w-32 h-32">
                              <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r="56" cx="64" cy="64" />
                              <circle className="text-health-blue" strokeWidth="10" stroke="currentColor" fill="transparent" r="56" cx="64" cy="64" 
                                strokeDasharray="352" strokeDashoffset="105" /> {/* 352 = 2πr, 105 = 352 * 0.3 (30% offset) */}
                            </svg>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold">70%</div>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Your work-life balance score</p>
                          <p className="text-health-blue-dark font-medium mt-2">Above average balance</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <div className="w-full md:w-1/3 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Mood Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {moodData.map(mood => (
                      <li key={mood.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-50 p-2 rounded-full">
                            {mood.icon}
                          </div>
                          <span className="font-medium text-sm">{mood.name}</span>
                        </div>
                        <Badge variant={mood.name === "Happy" ? "default" : mood.name === "Neutral" ? "secondary" : "destructive"}>
                          {mood.percent}%
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-health-blue" />
                      <span>Optimize sleep schedule (10:30 PM - 6:30 AM)</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Heart className="h-4 w-4 text-health-blue" />
                      <span>15-minute mindfulness meditation daily</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Bookmark className="h-4 w-4 text-health-blue" />
                      <span>Consider CBT for managing work stress</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4 text-sm" size="sm">
                    <Download className="h-3.5 w-3.5 mr-1" /> Download Full Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WellbeingPage;
