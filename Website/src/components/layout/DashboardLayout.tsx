
import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  
  return (
    <div className="flex min-h-screen bg-health-gray-light">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-health-blue-dark">{pageTitle}</h1>
          <div className="h-1 w-20 bg-health-blue mt-2"></div>
        </div>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

// Helper function to get page title based on route
const getPageTitle = (pathname: string): string => {
  const routes: Record<string, string> = {
    '/': 'Home',
    '/body-composition': 'Body Composition',
    '/heart-health': 'Heart Health & Lifestyle',
    '/blood-analysis': 'Blood Analysis',
    '/skin-health': 'Skin Health',
    '/wellbeing': 'Wellbeing & Stress',
    '/hormone-profile': 'Hormone Profile',
    '/physical-fitness': 'Physical Fitness',
    '/dna-nutrition': 'DNA & Nutrition',
  };
  
  return routes[pathname] || 'Page Not Found';
};

export default DashboardLayout;
