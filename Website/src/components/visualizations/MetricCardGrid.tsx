
import React from 'react';
import { MetricCard } from './MetricCard';

interface MetricCardGridProps {
  title: string;
  metrics: {
    title: string;
    value: string | number;
    unit?: string;
    change?: number;
    status?: 'normal' | 'warning' | 'critical' | 'good';
    description?: string;
    icon?: React.ReactNode;
  }[];
}

export function MetricCardGrid({ title, metrics }: MetricCardGridProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            unit={metric.unit}
            change={metric.change}
            status={metric.status}
            description={metric.description}
            icon={metric.icon}
          />
        ))}
      </div>
    </div>
  );
}
