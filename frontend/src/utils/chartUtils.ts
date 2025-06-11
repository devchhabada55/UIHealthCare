import type { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { formatDate } from './dateUtils';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Common chart options
export const defaultChartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        font: {
          family: 'Inter',
          size: 12,
        },
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#1e293b',
      bodyColor: '#64748b',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      padding: 12,
      boxPadding: 6,
      usePointStyle: true,
      callbacks: {
        label: function (context: any) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y.toFixed(2);
          }
          return label;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: 'Inter',
          size: 12,
        },
        color: '#64748b',
      },
    },
    y: {
      grid: {
        color: '#e2e8f0',
      },
      ticks: {
        font: {
          family: 'Inter',
          size: 12,
        },
        color: '#64748b',
      },
    },
  },
};

// Line chart options
export const lineChartOptions: ChartOptions = {
  ...defaultChartOptions,
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 4,
      hoverRadius: 6,
    },
  },
};

// Bar chart options
export const barChartOptions: ChartOptions = {
  ...defaultChartOptions,
  scales: {
    ...defaultChartOptions.scales,
    y: {
      ...defaultChartOptions.scales?.y,
      beginAtZero: true,
    },
  },
};

// Pie chart options
export const pieChartOptions: ChartOptions = {
  ...defaultChartOptions,
  plugins: {
    ...defaultChartOptions.plugins,
    legend: {
      ...defaultChartOptions.plugins?.legend,
      position: 'right' as const,
    },
  },
};

// Radar chart options
export const radarChartOptions: ChartOptions = {
  ...defaultChartOptions,
  scales: {
    r: {
      beginAtZero: true,
      ticks: {
        font: {
          family: 'Inter',
          size: 12,
        },
        color: '#64748b',
      },
      grid: {
        color: '#e2e8f0',
      },
      angleLines: {
        color: '#e2e8f0',
      },
      pointLabels: {
        font: {
          family: 'Inter',
          size: 12,
        },
        color: '#64748b',
      },
    },
  },
};

// Chart colors
export const chartColors = {
  primary: '#2196f3',
  secondary: '#f50057',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#00bcd4',
  grey: '#9e9e9e',
  lightGrey: '#e0e0e0',
  darkGrey: '#616161',
  white: '#ffffff',
  black: '#000000',
};

// Chart color palettes
export const chartColorPalettes = {
  default: [
    chartColors.primary,
    chartColors.secondary,
    chartColors.success,
    chartColors.warning,
    chartColors.error,
    chartColors.info,
  ],
  pastel: [
    '#a8d5ff',
    '#ffb3d9',
    '#b3e0b3',
    '#ffd699',
    '#ffb3b3',
    '#99e6e6',
  ],
  monochrome: [
    '#2196f3',
    '#1976d2',
    '#1565c0',
    '#0d47a1',
    '#1e88e5',
    '#42a5f5',
  ],
};

// Chart data formatters
export const formatChartData = (data: any[], xKey: string, yKey: string) => {
  return {
    labels: data.map((item) => formatDate(item[xKey])),
    datasets: [
      {
        label: yKey,
        data: data.map((item) => item[yKey]),
        borderColor: chartColors.primary,
        backgroundColor: chartColors.primary + '20',
        fill: true,
      },
    ],
  };
};

export const formatMultiSeriesChartData = (
  data: any[],
  xKey: string,
  yKeys: string[]
) => {
  return {
    labels: data.map((item) => formatDate(item[xKey])),
    datasets: yKeys.map((key, index) => ({
      label: key,
      data: data.map((item) => item[key]),
      borderColor: chartColorPalettes.default[index],
      backgroundColor: chartColorPalettes.default[index] + '20',
      fill: true,
    })),
  };
};

export const formatPieChartData = (data: any[], labelKey: string, valueKey: string) => {
  return {
    labels: data.map((item) => item[labelKey]),
    datasets: [
      {
        data: data.map((item) => item[valueKey]),
        backgroundColor: chartColorPalettes.default,
        borderColor: chartColors.white,
        borderWidth: 1,
      },
    ],
  };
};

export const formatRadarChartData = (
  data: any[],
  labelKey: string,
  valueKeys: string[]
) => {
  return {
    labels: valueKeys,
    datasets: data.map((item, index) => ({
      label: item[labelKey],
      data: valueKeys.map((key) => item[key]),
      backgroundColor: chartColorPalettes.default[index] + '20',
      borderColor: chartColorPalettes.default[index],
      borderWidth: 2,
      pointBackgroundColor: chartColorPalettes.default[index],
    })),
  };
};

// Chart helpers
export const calculateMovingAverage = (data: number[], windowSize: number): number[] => {
  const result: number[] = [];
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const window = data.slice(start, i + 1);
    const average = window.reduce((sum, val) => sum + val, 0) / window.length;
    result.push(average);
  }
  return result;
};

export const calculatePercentageChange = (oldValue: number, newValue: number): number => {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

// Chart animations
export const chartAnimations = {
  fadeIn: {
    duration: 1000,
    easing: 'easeInOutQuart',
  },
  slideIn: {
    duration: 1000,
    easing: 'easeOutQuart',
  },
  bounce: {
    duration: 1000,
    easing: 'easeOutBounce',
  },
};

// Chart interactions
export const chartInteractions = {
  hover: {
    mode: 'nearest' as const,
    intersect: true,
  },
  tooltip: {
    mode: 'index' as const,
    intersect: false,
  },
};

// Chart color palettes
export const CHART_COLORS = {
  primary: [
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 99, 132, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
  ],
  secondary: [
    'rgba(54, 162, 235, 0.4)',
    'rgba(255, 99, 132, 0.4)',
    'rgba(75, 192, 192, 0.4)',
    'rgba(255, 206, 86, 0.4)',
    'rgba(153, 102, 255, 0.4)',
    'rgba(255, 159, 64, 0.4)',
  ],
  success: [
    'rgba(75, 192, 192, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(153, 102, 255, 0.8)',
  ],
  warning: [
    'rgba(255, 206, 86, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(255, 99, 132, 0.8)',
  ],
  danger: [
    'rgba(255, 99, 132, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(255, 206, 86, 0.8)',
  ],
};

// Default chart options
export const DEFAULT_CHART_OPTIONS: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart Title',
    },
  },
};

// Create line chart data
export const createLineChartData = (
  labels: string[],
  datasets: { label: string; data: number[]; color?: string }[]
): ChartData<'line'> => {
  return {
    labels,
    datasets: datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: dataset.color || CHART_COLORS.primary[index % CHART_COLORS.primary.length],
      backgroundColor: CHART_COLORS.secondary[index % CHART_COLORS.secondary.length],
      fill: true,
      tension: 0.4,
    })),
  };
};

// Create bar chart data
export const createBarChartData = (
  labels: string[],
  datasets: { label: string; data: number[]; color?: string }[]
): ChartData<'bar'> => {
  return {
    labels,
    datasets: datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: dataset.color || CHART_COLORS.primary[index % CHART_COLORS.primary.length],
      borderColor: CHART_COLORS.secondary[index % CHART_COLORS.secondary.length],
      borderWidth: 1,
    })),
  };
};

// Create pie chart data
export const createPieChartData = (
  labels: string[],
  data: number[],
  colors: string[] = CHART_COLORS.primary
): ChartData<'pie'> => {
  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderColor: colors.map((color) => color.replace('0.8', '1')),
        borderWidth: 1,
      },
    ],
  };
};

// Create doughnut chart data
export const createDoughnutChartData = (
  labels: string[],
  data: number[],
  colors: string[] = CHART_COLORS.primary
): ChartData<'doughnut'> => {
  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderColor: colors.map((color) => color.replace('0.8', '1')),
        borderWidth: 1,
      },
    ],
  };
};

// Create radar chart data
export const createRadarChartData = (
  labels: string[],
  datasets: { label: string; data: number[]; color?: string }[]
): ChartData<'radar'> => {
  return {
    labels,
    datasets: datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: dataset.color
        ? dataset.color.replace('0.8', '0.2')
        : CHART_COLORS.primary[index % CHART_COLORS.primary.length].replace('0.8', '0.2'),
      borderColor: dataset.color || CHART_COLORS.primary[index % CHART_COLORS.primary.length],
      borderWidth: 2,
    })),
  };
};

// Create polar area chart data
export const createPolarAreaChartData = (
  labels: string[],
  data: number[],
  colors: string[] = CHART_COLORS.primary
): ChartData<'polarArea'> => {
  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderColor: colors.map((color) => color.replace('0.8', '1')),
        borderWidth: 1,
      },
    ],
  };
};

// Create health metrics chart data
export const createHealthMetricsChartData = (
  labels: string[],
  metrics: { name: string; values: number[]; unit: string }
): ChartData<'line'> => {
  return {
    labels,
    datasets: [
      {
        label: `${metrics.name} (${metrics.unit})`,
        data: metrics.values,
        borderColor: CHART_COLORS.primary[0],
        backgroundColor: CHART_COLORS.secondary[0],
        fill: true,
        tension: 0.4,
      },
    ],
  };
};

// Create comparison chart data
export const createComparisonChartData = (
  labels: string[],
  currentData: number[],
  previousData: number[],
  label: string
): ChartData<'bar'> => {
  return {
    labels,
    datasets: [
      {
        label: `Current ${label}`,
        data: currentData,
        backgroundColor: CHART_COLORS.primary[0],
        borderColor: CHART_COLORS.secondary[0],
        borderWidth: 1,
      },
      {
        label: `Previous ${label}`,
        data: previousData,
        backgroundColor: CHART_COLORS.primary[1],
        borderColor: CHART_COLORS.secondary[1],
        borderWidth: 1,
      },
    ],
  };
};

// Create progress chart data
export const createProgressChartData = (
  labels: string[],
  current: number[],
  target: number[],
  label: string
): ChartData<'line'> => {
  return {
    labels,
    datasets: [
      {
        label: `Current ${label}`,
        data: current,
        borderColor: CHART_COLORS.primary[0],
        backgroundColor: CHART_COLORS.secondary[0],
        fill: false,
        tension: 0.4,
      },
      {
        label: `Target ${label}`,
        data: target,
        borderColor: CHART_COLORS.success[0],
        backgroundColor: CHART_COLORS.success[0].replace('0.8', '0.2'),
        fill: false,
        tension: 0.4,
        borderDash: [5, 5],
      },
    ],
  };
};

// Create distribution chart data
export const createDistributionChartData = (
  labels: string[],
  data: number[],
  label: string
): ChartData<'pie'> => {
  return {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: CHART_COLORS.primary,
        borderColor: CHART_COLORS.primary.map((color) => color.replace('0.8', '1')),
        borderWidth: 1,
      },
    ],
  };
};

// Create trend chart data
export const createTrendChartData = (
  labels: string[],
  data: number[],
  label: string
): ChartData<'line'> => {
  return {
    labels,
    datasets: [
      {
        label,
        data,
        borderColor: CHART_COLORS.primary[0],
        backgroundColor: CHART_COLORS.secondary[0],
        fill: true,
        tension: 0.4,
      },
    ],
  };
};

// Create correlation chart data
export const createCorrelationChartData = (
  labels: string[],
  xData: number[],
  yData: number[],
  xLabel: string,
  yLabel: string
): ChartData<'scatter'> => {
  return {
    labels,
    datasets: [
      {
        label: `${xLabel} vs ${yLabel}`,
        data: xData.map((x, i) => ({ x, y: yData[i] })),
        backgroundColor: CHART_COLORS.primary[0],
        borderColor: CHART_COLORS.secondary[0],
        borderWidth: 1,
      },
    ],
  };
};

// Create stacked bar chart data
export const createStackedBarChartData = (
  labels: string[],
  datasets: { label: string; data: number[]; color?: string }[]
): ChartData<'bar'> => {
  return {
    labels,
    datasets: datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: dataset.color || CHART_COLORS.primary[index % CHART_COLORS.primary.length],
      borderColor: CHART_COLORS.secondary[index % CHART_COLORS.secondary.length],
      borderWidth: 1,
    })),
  };
};

// Create grouped bar chart data
export const createGroupedBarChartData = (
  labels: string[],
  datasets: { label: string; data: number[]; color?: string }[]
): ChartData<'bar'> => {
  return {
    labels,
    datasets: datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: dataset.color || CHART_COLORS.primary[index % CHART_COLORS.primary.length],
      borderColor: CHART_COLORS.secondary[index % CHART_COLORS.secondary.length],
      borderWidth: 1,
    })),
  };
};

// Create heatmap chart data
export const createHeatmapChartData = (
  labels: string[],
  data: number[][],
  label: string
): ChartData<'bar'> => {
  return {
    labels,
    datasets: data.map((row, rowIndex) => ({
      label: `${label} ${rowIndex + 1}`,
      data: row,
      backgroundColor: CHART_COLORS.primary[rowIndex % CHART_COLORS.primary.length],
      borderColor: CHART_COLORS.secondary[rowIndex % CHART_COLORS.secondary.length],
      borderWidth: 1,
    })),
  };
};

// Create bubble chart data
export const createBubbleChartData = (
  labels: string[],
  data: { x: number; y: number; r: number }[],
  label: string
): ChartData<'bubble'> => {
  return {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: CHART_COLORS.primary[0],
        borderColor: CHART_COLORS.secondary[0],
        borderWidth: 1,
      },
    ],
  };
};

// Create mixed chart data
export const createMixedChartData = (
  labels: string[],
  lineData: { label: string; data: number[]; color?: string },
  barData: { label: string; data: number[]; color?: string }
): ChartData<'line' | 'bar'> => {
  return {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: lineData.label,
        data: lineData.data,
        borderColor: lineData.color || CHART_COLORS.primary[0],
        backgroundColor: CHART_COLORS.secondary[0],
        fill: false,
        tension: 0.4,
      },
      {
        type: 'bar' as const,
        label: barData.label,
        data: barData.data,
        backgroundColor: barData.color || CHART_COLORS.primary[1],
        borderColor: CHART_COLORS.secondary[1],
        borderWidth: 1,
      },
    ],
  };
}; 