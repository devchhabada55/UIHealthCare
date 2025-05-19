
import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

interface ResponsiveDashboardProps {
  children: ReactNode;
}

const ResponsiveDashboard = ({ children }: ResponsiveDashboardProps) => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  
  return (
    <div className="flex min-h-screen bg-health-gray-light">
      <Sidebar />
      <MobileNav />
      
      <div className="flex-1 md:pl-0 pt-20 md:pt-0">
        <div className="p-4 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-health-blue-dark">{pageTitle}</h1>
            <div className="h-1 w-20 bg-health-blue mt-2"></div>
          </div>
          <main>
            {children}
          </main>
        </div>
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

export default ResponsiveDashboard;
