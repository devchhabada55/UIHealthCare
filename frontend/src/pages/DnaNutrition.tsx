
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
  ChartBarSeries,
} from '@/components/ui/chart';
import { ChartContainer } from '@/components/ui/chart-container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertCircle, Apple, Dna, CheckCircle, XCircle, Download, Filter } from "lucide-react";

const DnaNutritionPage = () => {
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

  // Sample data for genetic markers and nutrition sensitivity
  const geneticMarkers = [
    { name: "MTHFR", status: "Variant", impact: "High", description: "Affects folate metabolism" },
    { name: "FTO", status: "Variant", impact: "Medium", description: "Associated with weight gain" },
    { name: "TCF7L2", status: "Normal", impact: "Low", description: "Affects insulin production" },
    { name: "APOA5", status: "Variant", impact: "Medium", description: "Influences triglyceride levels" },
    { name: "CYP1A2", status: "Normal", impact: "Low", description: "Caffeine metabolism" },
  ];

  const macroData = [
    { name: "Protein", value: 35, color: "#38BDF8" },
    { name: "Carbs", value: 40, color: "#A78BFA" },
    { name: "Fat", value: 25, color: "#FB923C" },
  ];

  const nutrientSensitivity = [
    { nutrient: "Vitamin D", sensitivity: 85, recommended: 4000 },
    { nutrient: "Vitamin B12", sensitivity: 65, recommended: 1000 },
    { nutrient: "Omega-3", sensitivity: 78, recommended: 1500 },
    { nutrient: "Iron", sensitivity: 45, recommended: 12 },
    { nutrient: "Zinc", sensitivity: 62, recommended: 15 },
  ];

  return (
    <div className="space-y-8">
      <FileUpload
        onFileSelect={handleFileSelect}
        onAnalyze={handleAnalyze}
        reportType="DNA & Nutrition"
        isLoading={isLoading}
      />
      
      {isAnalyzed && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <Card className="md:col-span-8">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-xl font-bold text-health-blue-dark">DNA Analysis Results</CardTitle>
                  <CardDescription>Your genetic markers and their nutritional implications</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left font-medium text-gray-500">Marker</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500">Status</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500">Impact</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {geneticMarkers.map((marker, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{marker.name}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              {marker.status === "Variant" ? (
                                <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
                              ) : (
                                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                              )}
                              {marker.status}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              marker.impact === "High" 
                                ? "bg-red-100 text-red-800" 
                                : marker.impact === "Medium"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-green-100 text-green-800"
                            }`}>
                              {marker.impact}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{marker.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-health-blue-dark">Ideal Macro Profile</CardTitle>
                  <Apple className="h-5 w-5 text-health-blue" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <Chart>
                    <ChartContainer type="pie">
                      {macroData.map((entry, index) => (
                        <React.Fragment key={entry.name}>
                          <Dna className="h-0 w-0 opacity-0" />
                        </React.Fragment>
                      ))}
                    </ChartContainer>
                  </Chart>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-gray-600">
                    <span className="inline-block w-3 h-3 rounded-full bg-[#38BDF8]"></span>
                    <span>Protein: 35% (1.8g per kg body weight)</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <span className="inline-block w-3 h-3 rounded-full bg-[#A78BFA]"></span>
                    <span>Carbs: 40% (focus on complex carbs)</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <span className="inline-block w-3 h-3 rounded-full bg-[#FB923C]"></span>
                    <span>Fat: 25% (prioritize omega-3s)</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-health-blue-dark flex items-center gap-2">
                <Dna className="h-5 w-5 text-health-blue" />
                Nutrient Sensitivity Profile
              </CardTitle>
              <CardDescription>Based on your genetic markers, you may need different levels of these nutrients</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chart">
                <TabsList className="mb-4">
                  <TabsTrigger value="chart">Sensitivity Chart</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="chart" className="h-[300px]">
                  <Chart>
                    <ChartContainer type="bar" data={nutrientSensitivity}>
                      <ChartTitle>Nutrient Sensitivity Based on DNA Analysis</ChartTitle>
                      <ChartTooltip />
                      <ChartGrid />
                      <ChartXAxis dataKey="nutrient" />
                      <ChartYAxis />
                      <ChartBarSeries
                        data={nutrientSensitivity}
                        dataKey="nutrient"
                        valueKey="sensitivity"
                        name="Sensitivity Score"
                        color="#4AAEFF"
                      />
                    </ChartContainer>
                  </Chart>
                </TabsContent>
                
                <TabsContent value="recommendations">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Daily Nutrient Recommendations</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {nutrientSensitivity.map((item, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between mb-2">
                              <span className="font-medium">{item.nutrient}</span>
                              <span className="text-health-blue-dark font-bold">{item.recommended} {
                                item.nutrient === "Vitamin D" || item.nutrient === "Vitamin B12" ? "IU" : 
                                item.nutrient === "Omega-3" ? "mg" : "mg"
                              }</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.sensitivity > 75 ? (
                                <div className="flex items-center gap-1">
                                  <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                                  <span>Higher than average needs</span>
                                </div>
                              ) : item.sensitivity < 50 ? (
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                                  <span>Standard requirements</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <Dna className="h-3.5 w-3.5 text-blue-500" />
                                  <span>Moderate genetic influence</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button className="flex items-center gap-2 bg-health-blue hover:bg-health-blue-dark">
                        <Download className="h-4 w-4" />
                        Download Full Genetic Nutrition Plan
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full shrink-0">
              <Dna className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-blue-800 font-medium mb-1">How to use your DNA & Nutrition Report</h4>
              <p className="text-sm text-blue-700">
                This analysis identifies genetic variations that may influence how your body processes nutrients.
                While genetics play an important role, remember that lifestyle, environment, and dietary choices
                remain significant factors in your overall health. Consider consulting with a nutritionist to create
                a personalized plan based on these insights.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DnaNutritionPage;
