import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Brain, 
  Apple, 
  Moon, 
  Activity, 
  Stethoscope, 
  Menu,
  X,
  BarChart3,
  Calendar,
  Settings,
  User,
  ChevronRight,
} from 'lucide-react';
import logo from '../logo.png';
import ChatbotPopup from '../components/ChatbotPopup';
import { SpiderChart } from '../components/visualizations/SpiderChart';

interface HealthButtonProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  stats: string;
}

const HealthButton = ({ to, label, icon, description, stats }: HealthButtonProps) => (
  <Link to={to} className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-teal-200 transition-all duration-300 cursor-pointer">
    <div className="flex items-start justify-between mb-2">
      <div className="p-3 bg-teal-50 rounded-lg group-hover:bg-teal-100 transition-colors duration-300">
        <div className="text-teal-600">
          {icon}
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-colors duration-300" />
    </div>
    
    <h3 className="text-lg font-semibold text-gray-900 mb-1">
      {label}
    </h3>
    
    <p className="text-sm text-gray-600 mb-2 leading-relaxed">
      {description}
    </p>
    
    <div className="text-xs text-teal-600 font-medium">
      {stats}
    </div>
  </Link>
);

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <>
    {/* Overlay */}
    {isOpen && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
    )}
    
    {/* Sidebar */}
    <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 lg:static lg:shadow-none lg:border-r lg:border-gray-100`}>
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="2H Health Centre Logo" className="w-auto h-20" />
        </div>
        <button onClick={onClose} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="p-6 space-y-2">
        <div className="mb-6">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Health Metrics
          </h3>
          <div className="space-y-1">
            <Link to="/dashboard" className="flex items-center px-3 py-2 text-sm font-medium text-teal-600 bg-teal-50 rounded-lg">
              <BarChart3 className="w-4 h-4 mr-3" />
              Dashboard
            </Link>
            <Link to="/physical-health" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Heart className="w-4 h-4 mr-3" />
              Physical Health
            </Link>
            <Link to="/mental-health" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Brain className="w-4 h-4 mr-3" />
              Mental Health
            </Link>
            <Link to="/nutrition" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Apple className="w-4 h-4 mr-3" />
              Nutrition
            </Link>
            <Link to="/sleep" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Moon className="w-4 h-4 mr-3" />
              Sleep Analysis
            </Link>
            <Link to="/inflammatory" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Activity className="w-4 h-4 mr-3" />
              Inflammatory
            </Link>
            <Link to="/medical" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Stethoscope className="w-4 h-4 mr-3" />
              Medical Records
            </Link>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Tools
          </h3>
          <div className="space-y-1">
            <Link to="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Calendar className="w-4 h-4 mr-3" />
              Appointments
            </Link>
            <Link to="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <User className="w-4 h-4 mr-3" />
              Profile
            </Link>
            <Link to="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Bottom Section */}
    </div>
  </>
);

const PatientDashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  //const location = useLocation();
  //const queryParams = new URLSearchParams(location.search);
  // const patientId = queryParams.get('patientId');

  // // Dummy patient data based on patientId for demonstration
  // const patientInfo = patientId ? 
  //   { name: `Patient ${patientId}`, age: 30, gender: 'Female' } : 
  //   { name: 'John Doe', age: 45, gender: 'Male' };

  const healthCategories = [
    {
      to: '/physical-health',
      label: 'Physical Health',
      icon: <Heart className="w-6 h-6" />,
      description: 'Comprehensive body metrics and fitness tracking with scientifically validated assessments.',
      stats: 'Last updated: Today'
    },
    {
      to: '/mental-health',
      label: 'Mental Health',
      icon: <Brain className="w-6 h-6" />,
      description: 'Evidence-based mental wellness monitoring and cognitive performance analysis.',
      stats: '7-day trend available'
    },
    {
      to: '/nutrition',
      label: 'Nutrition',
      icon: <Apple className="w-6 h-6" />,
      description: 'Personalized dietary insights and nutritional optimization strategies.',
      stats: 'Weekly report ready'
    },
    {
      to: '/sleep',
      label: 'Sleep Analysis',
      icon: <Moon className="w-6 h-6" />,
      description: 'Sleep quality assessment and optimization for enhanced recovery and performance.',
      stats: 'Sleep score: 82/100'
    },
    {
      to: '/inflammatory',
      label: 'Inflammatory Markers',
      icon: <Activity className="w-6 h-6" />,
      description: 'Inflammation tracking and immune system health monitoring with actionable insights.',
      stats: 'Markers stable'
    },
    {
      to: '/medical',
      label: 'Medical Records',
      icon: <Stethoscope className="w-6 h-6" />,
      description: 'Integrated medical history and health data management with clinical insights.',
      stats: '3 new entries'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Health Dashboard</h1>
                <p className="text-sm text-gray-600">Track and improve your health with science-based insights</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* <div className="hidden sm:flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Secure & Private</span>
              </div> */}
              <Link to="/profile" className="relative p-2 rounded-full bg-teal-500 text-white flex items-center justify-center w-10 h-10 shadow-md hover:bg-teal-600 transition-colors duration-200">
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Health Overview</h2>
              <div className="h-[400px] overflow-hidden">
                <SpiderChart data={{
                  physical: 85,
                  mental: 70,
                  nutrition: 90,
                  sleep: 75,
                  inflammatory: 60,
                  medical: 80,
                }} />
              </div>
            </div>
          </div>

          {/* Health Categories Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Your Health Metrics</h3>
              <Link to="/support" className="text-sm font-medium text-teal-600 hover:text-teal-700">
                View All Reports
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthCategories.map((category, index) => (
                <HealthButton key={index} {...category} />
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-white rounded-xl p-8 border border-gray-100">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                A refreshing approach to your health
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                We are rewiring the way work, life and health are defined and intertwined with the use of 
                scientifically validated data. Our integrative support ecosystem guides you through 
                innovation and evidence-based approaches.
              </p>
              <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200">
                Schedule Consultation
              </button>
            </div>
          </div>
        </main>
      </div>
      <ChatbotPopup />
    </div>
  );
};

export default PatientDashboardPage;