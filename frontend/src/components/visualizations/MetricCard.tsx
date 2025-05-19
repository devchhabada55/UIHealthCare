
import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, CircleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  status?: 'normal' | 'warning' | 'critical' | 'good';
  description?: string;
  icon?: React.ReactNode;
}

export function MetricCard({ 
  title, 
  value, 
  unit, 
  change, 
  status = 'normal',
  description,
  icon
}: MetricCardProps) {
  
  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return 'text-green-600';
      case 'warning':
        return 'text-amber-500';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeColor = () => {
    if (change === undefined) return '';
    return change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && <div className="text-health-blue">{icon}</div>}
      </div>
      
      <div className="flex items-end gap-2">
        <span className="text-2xl md:text-3xl font-bold">{value}</span>
        {unit && <span className="text-gray-500 mb-1">{unit}</span>}
      </div>
      
      {(change !== undefined || status !== 'normal') && (
        <div className="mt-2 flex items-center">
          {change !== undefined && (
            <div className={cn("flex items-center text-sm", getChangeColor())}>
              {change > 0 ? (
                <ArrowUpIcon className="h-3 w-3 mr-1" />
              ) : change < 0 ? (
                <ArrowDownIcon className="h-3 w-3 mr-1" />
              ) : null}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
          
          {status !== 'normal' && (
            <div className={cn("flex items-center text-sm ml-auto", getStatusColor())}>
              {status === 'warning' || status === 'critical' ? (
                <CircleAlert className="h-4 w-4 mr-1" />
              ) : null}
              <span className="capitalize">{status}</span>
            </div>
          )}
        </div>
      )}
      
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
