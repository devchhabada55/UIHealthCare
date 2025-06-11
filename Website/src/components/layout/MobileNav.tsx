import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User,Droplet, SmilePlus, Brain, Dna,Menu, X, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const MobileNavItem = ({ to, icon, label, onClick }: MobileNavItemProps) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
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

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-10 px-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-health-blue">Health Dashboard</h1>
        <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-gray-100">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20" onClick={closeMenu} />
      )}

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed top-16 right-0 bottom-0 w-3/4 bg-white z-30 transform transition-transform duration-300 ease-in-out shadow-lg",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="p-4 space-y-1">
          <p className="text-xs text-gray-500 uppercase tracking-wider px-4 mb-2">Dashboard</p>
          <MobileNavItem to="/" icon={<Home className="h-5 w-5" />} label="Home" onClick={closeMenu} />
          
          <p className="text-xs text-gray-500 uppercase tracking-wider px-4 mb-2 mt-6">Health Reports</p>
          <MobileNavItem to="/physical-health" icon={<User className="h-5 w-5" />} label="Physical Health" onClick={closeMenu} />
          <MobileNavItem to="/mental-health" icon={<Brain className="h-5 w-5" />} label="Mental Health" onClick={closeMenu} />
          <MobileNavItem to="/nutrition" icon={<Droplet className="h-5 w-5" />} label="Nutrition" onClick={closeMenu} />
          <MobileNavItem to="/sleep" icon={<SmilePlus className="h-5 w-5" />} label="Sleep" onClick={closeMenu} />
          <MobileNavItem to="/inflammatory" icon={<Brain className="h-5 w-5" />} label="Inflammatory" onClick={closeMenu} />
          <MobileNavItem to="/medical" icon={<Dna className="h-5 w-5" />} label="Medical" onClick={closeMenu} />
        </nav>
      </div>
    </>
  );
};
