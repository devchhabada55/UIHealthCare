import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  TrendingDown, 
  AlertTriangle, 
  Target,
  Heart,
  Dumbbell,
  User,
  ArrowLeft,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Settings,
  Eye,
  EyeOff
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
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const isAdmin = localStorage.getItem('role') === 'admin';

  // User Data State
  const [userData, setUserData] = useState({
    name: "Yves Vannerom",
    age: 45,
    height: 184,
    weight: 93,
    testDate: "April 8, 2025"
  });

  // Assessment Data State
  const [assessmentData, setAssessmentData] = useState({
    vo2max: 32,
    handgripRight: 42.1,
    handgripLeft: 37.4,
    pushups: 9,
    bmi: 27.5
  });

  // Radar Chart Data State
  const [radarData, setRadarData] = useState([
    { subject: 'Cardiovascular', score: 30, fullMark: 100 },
    { subject: 'Upper Strength', score: 25, fullMark: 100 },
    { subject: 'Lower Strength', score: 60, fullMark: 100 },
    { subject: 'Balance', score: 35, fullMark: 100 },
    { subject: 'Mobility', score: 45, fullMark: 100 }
  ]);

  // Comparison Data State
  const [comparisonData, setComparisonData] = useState([
    { metric: 'VO2 Max', your: 32, average: 42 },
    { metric: 'Handgrip', your: 42.1, average: 48 },
    { metric: 'Push-ups', your: 9, average: 20 }
  ]);

  // Key Findings State
  const [keyFindings, setKeyFindings] = useState([
    "VO2 max of 32 ml/min/kg is below average for your age group",
    "Handgrip strength is normal but on the lower end",
    "Upper body strength needs significant improvement", 
    "Currently experiencing lower back pain",
    "Minimal regular physical activity (mainly padel)"
  ]);

  // Recommendations State
  const [recommendations, setRecommendations] = useState([
    "Start with 2-3 cardio sessions per week (walking, swimming)",
    "Begin basic strength training with bodyweight exercises",
    "Continue physiotherapy for back pain management",
    "Gradually increase activity level over 3-6 months",
    "Focus on core strengthening and mobility work"
  ]);

  // Metrics Configuration State
  const [metricsConfig, setMetricsConfig] = useState([
    { 
      key: 'vo2max', 
      title: 'VO2 Max', 
      icon: Heart, 
      color: 'red', 
      status: 'Below Average',
      statusColor: 'red'
    },
    { 
      key: 'handgripRight', 
      title: 'Handgrip (R)', 
      icon: Dumbbell, 
      color: 'blue', 
      status: 'Normal but Low',
      statusColor: 'orange',
      unit: 'kg'
    },
    { 
      key: 'pushups', 
      title: 'Push-ups', 
      icon: Activity, 
      color: 'green', 
      status: 'Poor',
      statusColor: 'red'
    },
    { 
      key: 'bmi', 
      title: 'BMI', 
      icon: User, 
      color: 'purple', 
      status: 'Overweight',
      statusColor: 'orange'
    }
  ]);

  // Admin Functions
  const handleSaveChanges = () => {
    setIsEditMode(false);
    // Here you would typically save to backend
    console.log('Saving changes...', {
      userData,
      assessmentData,
      radarData,
      comparisonData,
      keyFindings,
      recommendations,
      metricsConfig
    });
  };

  const addKeyFinding = () => {
    setKeyFindings([...keyFindings, "New finding - click to edit"]);
  };

  const removeKeyFinding = (index:number) => {
    setKeyFindings(keyFindings.filter((_, i) => i !== index));
  };

  const updateKeyFinding = (index:number, value:string) => {
    const updated = [...keyFindings];
    updated[index] = value;
    setKeyFindings(updated);
  };

  const addRecommendation = () => {
    setRecommendations([...recommendations, "New recommendation - click to edit"]);
  };

  const removeRecommendation = (index: number) => {
    setRecommendations(recommendations.filter((_, i) => i !== index));
  };

  const updateRecommendation = (index: number, value: string) => {
    const updated = [...recommendations];
    updated[index] = value;
    setRecommendations(updated);
  };

  const addRadarDataPoint = () => {
    setRadarData([...radarData, { subject: 'New Metric', score: 50, fullMark: 100 }]);
  };

  const removeRadarDataPoint = (index:number) => {
    setRadarData(radarData.filter((_, i) => i !== index));
  };

  const updateRadarDataPoint = (index:number, field:string, value:string) => {
    const updated = [...radarData];
    updated[index] = { ...updated[index], [field]: value };
    setRadarData(updated);
  };

  const addComparisonDataPoint = () => {
    setComparisonData([...comparisonData, { metric: 'New Metric', your: 0, average: 0 }]);
  };

  const removeComparisonDataPoint = (index:number) => {
    setComparisonData(comparisonData.filter((_, i) => i !== index));
  };

  const updateComparisonDataPoint = (index:number, field:string, value:string) => {
    const updated = [...comparisonData];
    updated[index] = { ...updated[index], [field]: value };
    setComparisonData(updated);
  };
  
  const getColorClass = (color: 'red' | 'blue' | 'green' | 'purple' | 'orange') => {
    const colors = {
      red: 'text-red-500',
      blue: 'text-blue-500',
      green: 'text-green-500',
      purple: 'text-purple-500',
      orange: 'text-orange-500'
    };
    return colors[color] || 'text-gray-500';
  };

  const getStatusColorClass = (color: 'red' | 'orange' | 'green') => {
    const colors = {
      red: 'text-red-600',
      orange: 'text-orange-600',
      green: 'text-green-600'
    };
    return colors[color] || 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Admin Header (only if role=admin) */}
        {isAdmin && (
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Physical Health Report
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowAdminPanel(!showAdminPanel)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {showAdminPanel ? 'Hide' : 'Show'} Controls
                </button>
                {isEditMode ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveChanges}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditMode(false)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Page
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Admin Controls Panel */}
        {isAdmin && showAdminPanel && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Quick Admin Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className="flex items-center justify-center px-3 py-2 bg-white border border-blue-300 rounded-md text-blue-700 hover:bg-blue-50"
              >
                {isEditMode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {isEditMode ? 'Preview' : 'Edit Mode'}
              </button>
              <button
                onClick={addKeyFinding}
                className="flex items-center justify-center px-3 py-2 bg-white border border-blue-300 rounded-md text-blue-700 hover:bg-blue-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Finding
              </button>
              <button
                onClick={addRecommendation}
                className="flex items-center justify-center px-3 py-2 bg-white border border-blue-300 rounded-md text-blue-700 hover:bg-blue-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Recommendation
              </button>
              <button
                onClick={addRadarDataPoint}
                className="flex items-center justify-center px-3 py-2 bg-white border border-blue-300 rounded-md text-blue-700 hover:bg-blue-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Radar Metric
              </button>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
        </div>

        {/* User Info Editor (Admin Only) */}
        {isAdmin && isEditMode && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">Edit User Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={userData.age}
                  onChange={(e) => setUserData({...userData, age: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={userData.height}
                  onChange={(e) => setUserData({...userData, height: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={userData.weight}
                  onChange={(e) => setUserData({...userData, weight: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Date</label>
                <input
                  type="text"
                  value={userData.testDate}
                  onChange={(e) => setUserData({...userData, testDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {metricsConfig.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div key={metric.key} className="bg-white rounded-lg shadow p-4 relative">
                {isAdmin && isEditMode && (
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button
                      onClick={() => {
                        const newConfig = [...metricsConfig];
                        newConfig.splice(index, 1);
                        setMetricsConfig(newConfig);
                      }}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <div className="flex items-center">
                  <IconComponent className={`w-8 h-8 ${getColorClass(metric.color as 'red' | 'blue' | 'green' | 'purple' | 'orange')} mr-3`} />
                  <div className="flex-1">
                    {isEditMode ? (
                      <div className="space-y-1">
                        <input
                          type="text"
                          value={metric.title}
                          onChange={(e) => {
                            const updated = [...metricsConfig];
                            updated[index] = {...updated[index], title: e.target.value};
                            setMetricsConfig(updated);
                          }}
                          className="text-sm text-gray-600 w-full border-none p-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                        />
                        <input
                          type="number"
                          value={assessmentData[metric.key as keyof typeof assessmentData]}
                          onChange={(e) => setAssessmentData({
                            ...assessmentData,
                            [metric.key]: parseFloat(e.target.value)
                          })}
                          className="text-xl font-bold w-full border-none p-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                        />
                        <input
                          type="text"
                          value={metric.status}
                          onChange={(e) => {
                            const updated = [...metricsConfig];
                            updated[index] = {...updated[index], status: e.target.value};
                            setMetricsConfig(updated);
                          }}
                          className={`text-xs ${getStatusColorClass(metric.statusColor as 'red' | 'orange' | 'green')} w-full border-none p-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded`}
                        />
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-600">{metric.title}</p>
                        <p className="text-xl font-bold">
                          {assessmentData[metric.key as keyof typeof assessmentData]}{metric.unit || ''}
                        </p>
                        <p className={`text-xs ${getStatusColorClass(metric.statusColor as 'red' | 'orange' | 'green')} w-full border-none p-0 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded`}>
                          {metric.status}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fitness Assessment Radar */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Fitness Assessment
              </h2>
              {isAdmin && isEditMode && (
                <button
                  onClick={addRadarDataPoint}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {isEditMode && (
              <div className="mb-4 space-y-2 max-h-32 overflow-y-auto">
                {radarData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <input
                      type="text"
                      value={item.subject}
                      onChange={(e) => updateRadarDataPoint(index, 'subject', e.target.value)}
                      className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Subject"
                    />
                    <input
                      type="number"
                      value={item.score}
                      onChange={(e) => updateRadarDataPoint(index, 'score', parseInt(e.target.value).toString())}
                      className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Score"
                    />
                    <button
                      onClick={() => removeRadarDataPoint(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your Performance vs Average</h2>
              {isAdmin && isEditMode && (
                <button
                  onClick={addComparisonDataPoint}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {isEditMode && (
              <div className="mb-4 space-y-2 max-h-32 overflow-y-auto">
                {comparisonData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <input
                      type="text"
                      value={item.metric}
                      onChange={(e) => updateComparisonDataPoint(index, 'metric', e.target.value)}
                      className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Metric"
                    />
                    <input
                      type="number"
                      value={item.your}
                      onChange={(e) => updateComparisonDataPoint(index, 'your', e.target.value)}
                      className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Your"
                    />
                    <input
                      type="number"
                      value={item.average}
                      onChange={(e) => updateComparisonDataPoint(index, 'average', e.target.value)}
                      className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Avg"
                    />
                    <button
                      onClick={() => removeComparisonDataPoint(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
              Key Findings
            </h2>
            {isAdmin && isEditMode && (
              <button
                onClick={addKeyFinding}
                className="text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="space-y-2">
            {keyFindings.map((finding, index) => (
              <div key={index} className="flex items-start">
                <TrendingDown className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0 mt-1" />
                {isEditMode ? (
                  <div className="flex-1 flex items-center space-x-2">
                    <textarea
                      value={finding}
                      onChange={(e) => updateKeyFinding(index, e.target.value)}
                      className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={2}
                    />
                    <button
                      onClick={() => removeKeyFinding(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-700">{finding}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-500" />
              Recommendations
            </h2>
            {isAdmin && isEditMode && (
              <button
                onClick={addRecommendation}
                className="text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                {isEditMode ? (
                  <div className="flex-1 flex items-center space-x-2 -ml-5">
                    <span className="text-gray-500">•</span>
                    <textarea
                      value={recommendation}
                      onChange={(e) => updateRecommendation(index, e.target.value)}
                      className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={2}
                    />
                    <button
                      onClick={() => removeRecommendation(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  recommendation
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Plan Button */}
        <div className="text-center mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
            View Detailed Action Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhysicalHealthReport;