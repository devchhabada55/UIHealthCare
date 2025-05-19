
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User, Heart, Droplet, SmilePlus, Brain, Dna, Dumbbell, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
          <MobileNavItem to="/" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>} label="Home" onClick={closeMenu} />
          <MobileNavItem to="/body-composition" icon={<User size={20} />} label="Body Composition" onClick={closeMenu} />
          <MobileNavItem to="/heart-health" icon={<Heart size={20} />} label="Heart Health" onClick={closeMenu} />
          <MobileNavItem to="/blood-analysis" icon={<Droplet size={20} />} label="Blood Analysis" onClick={closeMenu} />
          <MobileNavItem to="/skin-health" icon={<SmilePlus size={20} />} label="Skin Health" onClick={closeMenu} />
          <MobileNavItem to="/wellbeing" icon={<Brain size={20} />} label="Wellbeing & Stress" onClick={closeMenu} />
          <MobileNavItem to="/hormone-profile" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>} label="Hormone Profile" onClick={closeMenu} />
          <MobileNavItem to="/physical-fitness" icon={<Dumbbell size={20} />} label="Physical Fitness" onClick={closeMenu} />
          <MobileNavItem to="/dna-nutrition" icon={<Dna size={20} />} label="DNA & Nutrition" onClick={closeMenu} />
        </nav>
      </div>
    </>
  );
};

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
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
        "hover:bg-health-blue/10 active:bg-health-blue/20",
        isActive 
          ? "bg-health-blue text-white hover:bg-health-blue active:bg-health-blue-dark" 
          : "text-gray-700"
      )}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
    </NavLink>
  );
};
