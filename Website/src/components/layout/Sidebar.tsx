import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Droplet, SmilePlus, Brain, Dna, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '../../logo.png'; // Assuming the logo path is correct

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
        {/* Logo with increased hardcoded pixel values for easy adjustment */}
        <img
          src={logo}
          alt="Healthcare Project Logo"
          className="w-56 h-20 object-contain" // Increased size here
        />
      </div>

      <div className="px-2 mb-6">
        {/* <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
          <div className="relative">
            <p className="text-sm font-medium text-blue-800">Health Report</p>
            <h4 className="text-xl font-bold text-blue-900">88%</h4>
            <div className="h-1.5 bg-blue-200 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-health-blue rounded-full" style={{ width: '88%' }}></div>
            </div>
            <p className="text-xs text-blue-700 mt-1">Your overall health score</p>
          </div>
        </div> */}
      </div>

      <nav className="space-y-1 flex-1">
        <p className="text-xs text-gray-500 uppercase tracking-wider px-4 mb-2">Dashboard</p>
        <NavItem to="/" icon={<Home className="h-5 w-5" />} label="Home" />
        
        <p className="text-xs text-gray-500 uppercase tracking-wider px-4 mb-2 mt-6">Health Reports</p>
        <NavItem to="/physical-health" icon={<User className="h-5 w-5" />} label="Physical Health" />
        <NavItem to="/mental-health" icon={<Brain className="h-5 w-5" />} label="Mental Health" />
        <NavItem to="/nutrition" icon={<Droplet className="h-5 w-5" />} label="Nutrition" />
        <NavItem to="/sleep" icon={<SmilePlus className="h-5 w-5" />} label="Sleep" />
        <NavItem to="/inflammatory" icon={<Brain className="h-5 w-5" />} label="Inflammatory" />
        <NavItem to="/medical" icon={<Dna className="h-5 w-5" />} label="Medical" />
      </nav>

      <div className="px-3 mt-6">
        {/* These sections remain commented out as per your previous request */}
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