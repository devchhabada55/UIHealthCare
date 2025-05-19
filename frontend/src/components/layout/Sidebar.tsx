
import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Heart, Droplet, SmilePlus, Brain, Dna, Dumbbell, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-2",
        "hover:bg-health-blue/10 active:bg-health-blue/20",
        isActive 
          ? "bg-health-blue text-white hover:bg-health-blue active:bg-health-blue-dark shadow-md" 
          : "text-gray-700"
      )}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium text-sm">{label}</span>
    </NavLink>
  );
};

export const Sidebar = () => {
  return (
    <aside className="min-h-screen w-64 bg-white border-r border-gray-200 py-6 px-3 hidden md:flex md:flex-col shadow-sm">
      <div className="mb-8 px-4">
        <h2 className="text-xl font-bold text-health-blue flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z" clipRule="evenodd" />
          </svg>
          Health Dashboard
        </h2>
      </div>
      
      <div className="px-2 mb-6">
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
          <div className="relative">
            <p className="text-sm font-medium text-blue-800">Health Report</p>
            <h4 className="text-xl font-bold text-blue-900">88%</h4>
            <div className="h-1.5 bg-blue-200 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-health-blue rounded-full" style={{ width: '88%' }}></div>
            </div>
            <p className="text-xs text-blue-700 mt-1">Your overall health score</p>
          </div>
        </div>
      </div>
      
      <nav className="space-y-1 flex-1">
        <p className="text-xs text-gray-500 uppercase tracking-wider px-4 mb-2">Dashboard</p>
        <NavItem to="/" icon={<Home className="h-5 w-5" />} label="Home" />
        
        <p className="text-xs text-gray-500 uppercase tracking-wider px-4 mb-2 mt-6">Health Reports</p>
        <NavItem to="/body-composition" icon={<User className="h-5 w-5" />} label="Body Composition" />
        <NavItem to="/heart-health" icon={<Heart className="h-5 w-5" />} label="Heart Health" />
        <NavItem to="/blood-analysis" icon={<Droplet className="h-5 w-5" />} label="Blood Analysis" />
        <NavItem to="/skin-health" icon={<SmilePlus className="h-5 w-5" />} label="Skin Health" />
        <NavItem to="/wellbeing" icon={<Brain className="h-5 w-5" />} label="Wellbeing & Stress" />
        <NavItem to="/hormone-profile" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>} label="Hormone Profile" />
        <NavItem to="/physical-fitness" icon={<Dumbbell className="h-5 w-5" />} label="Physical Fitness" />
        <NavItem to="/dna-nutrition" icon={<Dna className="h-5 w-5" />} label="DNA & Nutrition" />
      </nav>
      
      <div className="px-3 mt-6">
        {/* <div className="bg-health-blue/5 rounded-lg p-4 border border-health-blue/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10"></div>
          <div className="relative z-10">
            <p className="text-sm text-gray-600 font-medium">Need help with your reports?</p>
            <Button variant="link" className="text-sm font-medium text-health-blue p-0 h-auto mt-1">
              Contact Support
            </Button>
          </div>
        </div> */}
        
        {/* <div className="mt-4 flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-health-blue text-white flex items-center justify-center font-medium">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-gray-500 truncate">john@example.com</p>
          </div>
        </div> */}
      </div>
    </aside>
  );
};
