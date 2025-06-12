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
        backgroundColor: 'rgba(20, 184, 166, 0.2)',
        borderColor: 'rgba(20, 184, 166, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(20, 184, 166, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(20, 184, 166, 1)',
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
            size: 10,
          },
        },
        ticks: {
          display: true,
          beginAtZero: true,
          font: {
            size: 8,
          }
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
    layout: {
      padding: 20
    },
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
  };

  return (
    <div className="w-full h-full p-2">
      <Radar data={chartData} options={options} />
    </div>
  );
}; 