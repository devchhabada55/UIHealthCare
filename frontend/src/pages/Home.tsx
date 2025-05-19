
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartCard } from '@/components/visualizations/ChartCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, User, Activity, Heart, Brain, Dna } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample data for visualization
const healthScoreHistory = [
  { month: 'Dec', overall: 75, physical: 73, mental: 76 },
  { month: 'Jan', overall: 78, physical: 76, mental: 79 },
  { month: 'Feb', overall: 81, physical: 80, mental: 82 },
  { month: 'Mar', overall: 83, physical: 82, mental: 85 },
  { month: 'Apr', overall: 86, physical: 85, mental: 87 },
  { month: 'May', overall: 88, physical: 87, mental: 90 },
];

const HomePage = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-health-blue to-health-blue-light rounded-xl text-white p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to Your Health Dashboard</h1>
            <p className="text-white/90 text-lg max-w-2xl">
              Your comprehensive platform for visualizing and understanding your health metrics.
              Upload your health reports to see personalized insights and recommendations.
            </p>
            <div className="flex gap-4 mt-6">
              <Button className="bg-white text-health-blue hover:bg-white/90">
                <Calendar className="mr-2 h-4 w-4" />
                View Latest Reports
              </Button>
              {/* <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button> */}
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="w-48 h-48 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
              <div className="text-center">
                <div className="text-5xl font-bold">88</div>
                <div className="mt-2 font-medium">Health Score</div>
                <div className="text-sm text-white/80">+3 from last month</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="transition-transform hover:scale-[1.02] hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Analyzed Reports</p>
                <p className="text-3xl font-bold mt-1">12</p>
              </div>
              <div className="p-2 bg-blue-100 text-blue-700 rounded-full">
                <Activity className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 flex items-center">
                <svg className="w-3 h-3 fill-current mr-1" viewBox="0 0 12 12">
                  <path d="M3 8.25L6 5.25L9 8.25V11.25H3V8.25Z" transform="rotate(180 6 9)" />
                </svg>
                +3
              </span>
              <span className="text-gray-500 ml-1">since last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-transform hover:scale-[1.02] hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Latest Analysis</p>
                <p className="text-xl font-bold mt-1">Body Composition</p>
              </div>
              <div className="p-2 bg-green-100 text-green-700 rounded-full">
                <User className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                3 days ago
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-transform hover:scale-[1.02] hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Heart Health Score</p>
                <p className="text-3xl font-bold mt-1">86%</p>
              </div>
              <div className="p-2 bg-red-100 text-red-700 rounded-full">
                <Heart className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 flex items-center">
                <svg className="w-3 h-3 fill-current mr-1" viewBox="0 0 12 12">
                  <path d="M3 8.25L6 5.25L9 8.25V11.25H3V8.25Z" transform="rotate(180 6 9)" />
                </svg>
                +5%
              </span>
              <span className="text-gray-500 ml-1">improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-transform hover:scale-[1.02] hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Mental Wellbeing</p>
                <p className="text-3xl font-bold mt-1">90%</p>
              </div>
              <div className="p-2 bg-purple-100 text-purple-700 rounded-full">
                <Brain className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 flex items-center">
                <svg className="w-3 h-3 fill-current mr-1" viewBox="0 0 12 12">
                  <path d="M3 8.25L6 5.25L9 8.25V11.25H3V8.25Z" transform="rotate(180 6 9)" />
                </svg>
                +2%
              </span>
              <span className="text-gray-500 ml-1">improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Health Score Trends"
            description="Your progress over the last 6 months"
            data={healthScoreHistory}
            chartType="line"
            xKey="month"
            yKeys={[
              { key: 'overall', name: 'Overall Health', color: '#1a73e8' },
              { key: 'physical', name: 'Physical Health', color: '#34a853' },
              { key: 'mental', name: 'Mental Health', color: '#9c27b0' }
            ]}
          />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Your most recently analyzed health documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="p-2 bg-red-100 rounded-full">
                  <Heart className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 truncate">Heart Health Analysis</h4>
                  <p className="text-xs text-gray-500">May 15, 2025</p>
                </div>
                <Button variant="ghost" size="sm" className="flex-shrink-0" asChild>
                  <Link to="/heart-health">View</Link>
                </Button>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="p-2 bg-blue-100 rounded-full">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 truncate">Body Composition Report</h4>
                  <p className="text-xs text-gray-500">May 12, 2025</p>
                </div>
                <Button variant="ghost" size="sm" className="flex-shrink-0" asChild>
                  <Link to="/body-composition">View</Link>
                </Button>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="p-2 bg-purple-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 truncate">Hormone Profile Analysis</h4>
                  <p className="text-xs text-gray-500">May 5, 2025</p>
                </div>
                <Button variant="ghost" size="sm" className="flex-shrink-0" asChild>
                  <Link to="/hormone-profile">View</Link>
                </Button>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to="/">
                View All Reports
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100/50 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <Dna className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle>Upload New Reports</CardTitle>
            <CardDescription>
              Add your latest health documents for instant analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full bg-health-blue hover:bg-health-blue-dark">
                Select Report Type
              </Button>
            </div>
          </CardContent>
        </Card> */}

        {/* <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-100/50 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Trend Analysis</CardTitle>
            <CardDescription>
              Track changes in your health markers over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                View Trends
              </Button>
            </div>
          </CardContent>
        </Card> */}

        {/* <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100/50 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle>Personalized Insights</CardTitle>
            <CardDescription>
              Get tailored recommendations based on your health data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                View Insights
              </Button>
            </div>
          </CardContent>
        </Card> */}
      </div>
  );
};

export default HomePage;
