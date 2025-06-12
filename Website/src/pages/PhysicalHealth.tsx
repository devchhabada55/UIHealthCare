import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  TrendingDown, 
  AlertTriangle, 
  Target,
  Heart,
  Dumbbell,
  User,
  ArrowLeft
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar
} from 'recharts';

const PhysicalHealthReport = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // 4 seconds delay
    return () => clearTimeout(timer);
  }, []);

  const [] = useState({
    name: "Yves Vannerom",
    age: 45,
    height: 184,
    weight: 93,
    testDate: "April 8, 2025"
  });

  const [assessmentData] = useState({
    vo2max: 32,
    handgripRight: 42.1,
    handgripLeft: 37.4,
    pushups: 9,
    bmi: 27.5
  });

  const radarData = [
    { subject: 'Cardiovascular', score: 30, fullMark: 100 },
    { subject: 'Upper Strength', score: 25, fullMark: 100 },
    { subject: 'Lower Strength', score: 60, fullMark: 100 },
    { subject: 'Balance', score: 35, fullMark: 100 },
    { subject: 'Mobility', score: 45, fullMark: 100 }
  ];

  const comparisonData = [
    { metric: 'VO2 Max', your: 32, average: 42 },
    { metric: 'Handgrip', your: 42.1, average: 48 },
    { metric: 'Push-ups', your: 9, average: 20 }
  ];

  const keyFindings = [
    "VO2 max of 32 ml/min/kg is below average for your age group",
    "Handgrip strength is normal but on the lower end",
    "Upper body strength needs significant improvement", 
    "Currently experiencing lower back pain",
    "Minimal regular physical activity (mainly padel)"
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
          <p className="text-lg font-medium text-gray-700 mt-4">Analyzing... Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Button */}
        <div className="mb-4">
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back
            </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">VO2 Max</p>
                <p className="text-xl font-bold">{assessmentData.vo2max}</p>
                <p className="text-xs text-red-600">Below Average</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Dumbbell className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Handgrip (R)</p>
                <p className="text-xl font-bold">{assessmentData.handgripRight}kg</p>
                <p className="text-xs text-orange-600">Normal but Low</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Push-ups</p>
                <p className="text-xl font-bold">{assessmentData.pushups}</p>
                <p className="text-xs text-red-600">Poor</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <User className="w-8 h-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">BMI</p>
                <p className="text-xl font-bold">{assessmentData.bmi}</p>
                <p className="text-xs text-orange-600">Overweight</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fitness Assessment Radar */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Fitness Assessment
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Comparison */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Your Performance vs Average</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={comparisonData}>
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="your" fill="#ef4444" name="Your Score" />
                <Bar dataKey="average" fill="#22c55e" name="Age Average" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Findings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
            Key Findings
          </h2>
          <div className="space-y-2">
            {keyFindings.map((finding, index) => (
              <div key={index} className="flex items-start">
                <TrendingDown className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0 mt-1" />
                <p className="text-gray-700">{finding}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-500" />
            Recommendations
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Start with 2-3 cardio sessions per week (walking, swimming)</li>
            <li>Begin basic strength training with bodyweight exercises</li>
            <li>Continue physiotherapy for back pain management</li>
            <li>Gradually increase activity level over 3-6 months</li>
            <li>Focus on core strengthening and mobility work</li>
          </ul>
        </div>

        {/* Action Plan Button */}
        <div className="text-center mt-6">
          <button className="bg-health-blue hover:bg-health-blue-dark text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
            View Detailed Action Plan
          </button>
        </div>

      </div>
    </div>
  );
};

export default PhysicalHealthReport; 