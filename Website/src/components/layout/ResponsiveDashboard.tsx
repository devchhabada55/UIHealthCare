import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

const ResponsiveDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={false} onClose={function (): void {
        throw new Error('Function not implemented.');
      } } />
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default ResponsiveDashboard;
