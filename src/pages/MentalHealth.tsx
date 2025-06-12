import { useState } from 'react';
import {
  ArrowLeft,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Settings,
  Eye,
  EyeOff,
  Brain,
  Activity,
  Target,
  Heart,
  AlertCircle,
  BarChart2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Line,
  Legend,
  LineChart,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  background: '#f8fafc',
  card: '#ffffff',
  text: '#1e293b',
};

//const CHART_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

const MentalHealth = () => {
  const isAdmin = localStorage.getItem('role') === 'admin';

  //const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Key Findings State
  const [keyFindings, setKeyFindings] = useState(
    'The assessment shows elevated levels of perfectionism and private-life overcommitment, combined with symptoms of fatigue and nervousness. These factors increase the individual\'s vulnerability to mental overload and emotional burnout. Proactive recovery and resilience-building strategies are recommended.'
  );

  // Main Metrics State
  const [mainMetrics, setMainMetrics] = useState({
    stressAndRecoveryBalance: {
      value: 74,
      unit: '/100',
      description: 'The individual has functional capacity but lacks sufficient recovery periods, particularly from private life stressors. Continued imbalance may lead to chronic fatigue and lowered performance.',
    },
    cognitivePerformance: {
      value: 61,
      unit: '/100',
      description: 'Moderate cognitive load issues are present, including difficulty concentrating and signs of mental fatigue. Preventative strategies are advised.',
    }
  });

  // Additional Metrics State
  const [additionalMetrics, setAdditionalMetrics] = useState([
    { name: 'Mood Stability', value: 68, description: 'Generally stable with occasional fluctuations during high-stress periods.' },
    { name: 'Emotional Regulation', value: 72, description: 'Good ability to manage emotions with room for improvement in stressful situations.' },
    { name: 'Sleep Quality', value: 45, description: 'Poor sleep patterns affecting mental clarity and emotional well-being.' },
    { name: 'Social Connection', value: 80, description: 'Strong social support network contributing to overall mental health.' }
  ]);

  // Recommendations State
  const [recommendations, setRecommendations] = useState([
    {
      suggestion: 'Practice cognitive offloading techniques (e.g., journaling, task management apps).',
      category: 'Mental Recovery',
      description: 'Reduces working memory load and aids mental clarity.',
      priority: 'High',
      timeframe: 'Immediate',
      frequency: 'Daily'
    },
    {
      suggestion: 'Set personal boundaries and reduce non-essential private commitments.',
      category: 'Lifestyle Management',
      description: 'Helps prevent overcommitment from affecting emotional well-being.',
      priority: 'Medium',
      timeframe: 'Weekly',
      frequency: 'As needed'
    },
    {
      suggestion: 'Engage in moderate daily physical activity focused on strength and mobility.',
      category: 'Physical Health',
      description: 'Supports energy levels and reduces fatigue-related symptoms.',
      priority: 'High',
      timeframe: 'Daily',
      frequency: 'Daily'
    },
    {
      suggestion: 'Consider guided mindfulness or stress reduction programs.',
      category: 'Emotional Regulation',
      description: 'Decreases nervousness and improves emotional resilience.',
      priority: 'Medium',
      timeframe: 'Weekly',
      frequency: '2-3 times per week'
    }
  ]);

  // Chart Data States
  const [barChartData, setBarChartData] = useState([
    { name: 'Stress Balance', Score: 74 },
    { name: 'Cognitive Performance', Score: 61 },
    { name: 'Mood Stability', Score: 68 },
    { name: 'Emotional Regulation', Score: 72 }
  ]);

  const [radarChartData, setRadarChartData] = useState([
    { subject: 'Stress Management', score: 74, fullMark: 100 },
    { subject: 'Cognitive Function', score: 61, fullMark: 100 },
    { subject: 'Emotional Balance', score: 70, fullMark: 100 },
    { subject: 'Sleep Quality', score: 45, fullMark: 100 },
    { subject: 'Social Connection', score: 80, fullMark: 100 },
    { subject: 'Self Care', score: 55, fullMark: 100 }
  ]);

  const [trendData] = useState([
    { month: 'Jan', stress: 65, mood: 70, cognitive: 58 },
    { month: 'Feb', stress: 70, mood: 65, cognitive: 60 },
    { month: 'Mar', stress: 68, mood: 72, cognitive: 59 },
    { month: 'Apr', stress: 74, mood: 68, cognitive: 61 },
  ]);

  const wellbeingBreakdown = [
    { name: 'Positive', value: 45, color: COLORS.success },
    { name: 'Neutral', value: 35, color: COLORS.warning },
    { name: 'Negative', value: 20, color: COLORS.danger }
  ];


  // Admin Functions
  const handleSaveChanges = () => {
    setIsEditMode(false);
    console.log('Saving mental health data changes...', {
      keyFindings,
      mainMetrics,
      additionalMetrics,
      recommendations,
      barChartData,
      radarChartData,
      trendData
    });
  };

  const addRecommendation = () => {
    setRecommendations([...recommendations, {
      suggestion: 'New recommendation - click to edit',
      category: 'General',
      description: 'Description here',
      priority: 'Medium',
      timeframe: 'Weekly',
      frequency: 'As needed'
    }]);
  };

  const removeRecommendation = (index:number) => {
    setRecommendations(recommendations.filter((_, i) => i !== index));
  };

  const updateRecommendation = (index:number, field:string, value:string) => {
    const updated = [...recommendations];
    updated[index] = { ...updated[index], [field]: value };
    setRecommendations(updated);
  };
  
  const addAdditionalMetric = () => {
    setAdditionalMetrics([...additionalMetrics, {
      name: 'New Metric',
      value: 50,
      description: 'Description for new metric'
    }]);
  };

  const removeAdditionalMetric = (index:number) => {
    setAdditionalMetrics(additionalMetrics.filter((_, i) => i !== index));
  };

  const updateAdditionalMetric = (index:number, field:string, value:string) => {
    const updated = [...additionalMetrics];
    updated[index] = { ...updated[index], [field]: field === 'value' ? parseInt(value) || 0 : value };
    setAdditionalMetrics(updated);
  };

  const addBarChartData = () => {
    setBarChartData([...barChartData, { name: 'New Metric', Score: 50 }]);
  };

  const updateBarChartData = (index: number, field: string, value: string | number) => {
    const updated = [...barChartData];
    updated[index] = { ...updated[index], [field]: field === 'Score' ? Number(value) : value };
    setBarChartData(updated);
  };


  const removeBarChartItem = (index: number) => {
    setBarChartData(barChartData.filter((_, i) => i !== index));
  };

  const removeRadarChartItem = (index: number) => {
    setRadarChartData(radarChartData.filter((_, i) => i !== index));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Admin Header */}
        {isAdmin && (
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                  Mental Health Report
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
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">Quick Admin Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className="flex items-center justify-center px-3 py-2 bg-white border border-purple-300 rounded-md text-purple-700 hover:bg-purple-50"
              >
                {isEditMode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {isEditMode ? 'Preview' : 'Edit Mode'}
              </button>
              <button
                onClick={addRecommendation}
                className="flex items-center justify-center px-3 py-2 bg-white border border-purple-300 rounded-md text-purple-700 hover:bg-purple-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Recommendation
              </button>
              <button
                onClick={addAdditionalMetric}
                className="flex items-center justify-center px-3 py-2 bg-white border border-purple-300 rounded-md text-purple-700 hover:bg-purple-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Metric
              </button>
              <button
                onClick={addBarChartData}
                className="flex items-center justify-center px-3 py-2 bg-white border border-purple-300 rounded-md text-purple-700 hover:bg-purple-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Chart Data
              </button>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
        </div>

        {/* Key Findings Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Brain className="w-6 h-6 mr-2 text-purple-600" />
              Key Findings
            </h2>
            {isAdmin && isEditMode && null}
          </div>
          {isEditMode ? (
            <textarea
              value={keyFindings}
              onChange={(e) => setKeyFindings(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
            />
          ) : (
            <p className="text-gray-700 text-lg leading-relaxed">{keyFindings}</p>
          )}
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                Stress & Recovery Balance
              </h3>
              {isAdmin && isEditMode && (
                <Edit3 className="w-4 h-4 text-blue-600" />
              )}
            </div>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className="text-3xl font-bold text-blue-600">
                  {isEditMode ? (
                    <input
                      type="number"
                      value={mainMetrics.stressAndRecoveryBalance.value}
                      onChange={(e) => setMainMetrics({
                        ...mainMetrics,
                        stressAndRecoveryBalance: {
                          ...mainMetrics.stressAndRecoveryBalance,
                          value: parseInt(e.target.value) || 0
                        }
                      })}
                      className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    mainMetrics.stressAndRecoveryBalance.value
                  )}
                </span>
                <span className="text-lg text-gray-500 ml-1">{mainMetrics.stressAndRecoveryBalance.unit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-blue-600 h-3 rounded-full" 
                  style={{ width: `${mainMetrics.stressAndRecoveryBalance.value}%` }}
                ></div>
              </div>
            </div>
            {isEditMode ? (
              <textarea
                value={mainMetrics.stressAndRecoveryBalance.description}
                onChange={(e) => setMainMetrics({
                  ...mainMetrics,
                  stressAndRecoveryBalance: {
                    ...mainMetrics.stressAndRecoveryBalance,
                    description: e.target.value
                  }
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />
            ) : (
              <p className="text-gray-600">{mainMetrics.stressAndRecoveryBalance.description}</p>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-600" />
                Cognitive Performance
              </h3>
              {isAdmin && isEditMode && (
                <Edit3 className="w-4 h-4 text-blue-600" />
              )}
            </div>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className="text-3xl font-bold text-purple-600">
                  {isEditMode ? (
                    <input
                      type="number"
                      value={mainMetrics.cognitivePerformance.value}
                      onChange={(e) => setMainMetrics({
                        ...mainMetrics,
                        cognitivePerformance: {
                          ...mainMetrics.cognitivePerformance,
                          value: parseInt(e.target.value) || 0
                        }
                      })}
                      className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    mainMetrics.cognitivePerformance.value
                  )}
                </span>
                <span className="text-lg text-gray-500 ml-1">{mainMetrics.cognitivePerformance.unit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-purple-600 h-3 rounded-full" 
                  style={{ width: `${mainMetrics.cognitivePerformance.value}%` }}
                ></div>
              </div>
            </div>
            {isEditMode ? (
              <textarea
                value={mainMetrics.cognitivePerformance.description}
                onChange={(e) => setMainMetrics({
                  ...mainMetrics,
                  cognitivePerformance: {
                    ...mainMetrics.cognitivePerformance,
                    description: e.target.value
                  }
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />
            ) : (
              <p className="text-gray-600">{mainMetrics.cognitivePerformance.description}</p>
            )}
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Additional Mental Health Metrics
            </h3>
            {isAdmin && isEditMode && (
              <button
                onClick={addAdditionalMetric}
                className="text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalMetrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                {isEditMode ? (
                  <div className="flex justify-between mb-2">
                    <input
                      value={metric.name}
                      onChange={(e) => updateAdditionalMetric(index, 'name', e.target.value)}
                      className="text-lg font-medium w-2/3 p-1 border rounded"
                    />
                    <button
                      onClick={() => removeAdditionalMetric(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <h4 className="text-lg font-medium mb-2">{metric.name}</h4>
                )}

                <div className="mb-3">
                  {isEditMode ? (
                    <input
                      type="number"
                      value={metric.value}
                      onChange={(e) => updateAdditionalMetric(index, 'value', e.target.value)}
                      className="w-20 p-1 border rounded"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-blue-600">{metric.value}/100</span>
                  )}
                </div>

                {isEditMode ? (
                  <textarea
                    value={metric.description}
                    onChange={(e) => updateAdditionalMetric(index, 'description', e.target.value)}
                    className="w-full p-2 border rounded resize-none"
                    rows={2}
                  />
                ) : (
                  <p className="text-gray-600 text-sm">{metric.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
              Tailored Recommendations
            </h3>
            {isAdmin && isEditMode && (
              <button
                onClick={addRecommendation}
                className="text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg shadow">
                {isEditMode ? (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1 mb-2 sm:mb-0">
                      <input
                        value={rec.suggestion}
                        onChange={(e) => updateRecommendation(index, 'suggestion', e.target.value)}
                        className="text-lg font-medium w-full p-2 border rounded"
                        placeholder="Recommendation"
                      />
                    </div>
                    <div className="flex-1 mb-2 sm:mb-0 sm:ml-2">
                      <select
                        value={rec.priority}
                        onChange={(e) => updateRecommendation(index, 'priority', e.target.value)}
                        className="w-full p-2 border rounded bg-white"
                      >
                        <option value="Low">Low Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                      </select>
                    </div>
                    <div className="flex-1 mb-2 sm:mb-0 sm:ml-2">
                      <input
                        value={rec.timeframe}
                        onChange={(e) => updateRecommendation(index, 'timeframe', e.target.value)}
                        className="text-lg font-medium w-full p-2 border rounded"
                        placeholder="Timeframe"
                      />
                    </div>
                    <div className="flex-1 mb-2 sm:mb-0 sm:ml-2">
                      <input
                        value={rec.frequency}
                        onChange={(e) => updateRecommendation(index, 'frequency', e.target.value)}
                        className="text-lg font-medium w-full p-2 border rounded"
                        placeholder="Frequency"
                      />
                    </div>
                    <div className="flex items-center sm:ml-2">
                      <button
                        onClick={() => removeRecommendation(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <p className="text-lg font-medium">{rec.suggestion}</p>
                      <p className="text-sm text-gray-500">{rec.description}</p>
                    </div>
                    <div className="flex-1 text-right">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getPriorityColor(rec.priority)}`}>
                        {rec.priority} Priority
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Trend Analysis Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <BarChart2 className="w-5 h-5 mr-2 text-green-600" />
              Trend Analysis
            </h3>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="stress" stroke="#ef4444" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="mood" stroke="#3b82f6" />
              <Line type="monotone" dataKey="cognitive" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Overall Well-being Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-purple-600" />
              Overall Well-being
            </h3>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={wellbeingBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
              >
                {wellbeingBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MentalHealth;