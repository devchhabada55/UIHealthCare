
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '@/lib/utils';

type ChartType = 'line' | 'bar';

interface ChartCardProps {
  title: string;
  description?: string;
  data: any[];
  chartType?: ChartType;
  xKey: string;
  yKeys: { key: string; name: string; color: string }[];
  className?: string;
}

export function ChartCard({
  title,
  description,
  data,
  chartType = 'line',
  xKey,
  yKeys,
  className,
}: ChartCardProps) {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                {yKeys.map((y, index) => (
                  <Line
                    key={index}
                    type="monotone"
                    dataKey={y.key}
                    name={y.name}
                    stroke={y.color}
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            ) : (
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                {yKeys.map((y, index) => (
                  <Bar
                    key={index}
                    dataKey={y.key}
                    name={y.name}
                    fill={y.color}
                    radius={[4, 4, 0, 0]}
                  />
                ))}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
