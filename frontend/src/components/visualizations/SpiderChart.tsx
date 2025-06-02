import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SpiderChartProps {
  data: {
    physical: number;
    mental: number;
    nutrition: number;
    sleep: number;
    inflammatory: number;
    medical: number;
  };
}

export const SpiderChart: React.FC<SpiderChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Physical', 'Mental', 'Nutrition', 'Sleep', 'Inflammatory', 'Medical'],
    datasets: [
      {
        label: 'Health Parameters',
        data: [
          data.physical,
          data.mental,
          data.nutrition,
          data.sleep,
          data.inflammatory,
          data.medical,
        ],
        backgroundColor: 'rgba(26, 115, 232, 0.2)',
        borderColor: 'rgba(26, 115, 232, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(26, 115, 232, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(26, 115, 232, 1)',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        pointLabels: {
          font: {
            size: 12,
          },
        },
        ticks: {
          display: true,
          beginAtZero: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      }
    },
    maintainAspectRatio: false,
    aspectRatio: 1,
  };

  return (
    <div className="w-full h-full min-h-[400px] p-4">
      <Radar data={chartData} options={options} />
    </div>
  );
}; 