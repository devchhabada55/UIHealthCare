
import * as React from "react";
import { LineChart, BarChart, PieChart, AreaChart, RadarChart } from "recharts";

interface ChartContainerProps {
  children: React.ReactNode;
  type: "line" | "bar" | "pie" | "area" | "radar";
  data?: any[];
  [key: string]: any;
}

export function ChartContainer({ children, type, data = [], ...props }: ChartContainerProps) {
  switch (type) {
    case "line":
      return <LineChart data={data} {...props}>{children}</LineChart>;
    case "bar":
      return <BarChart data={data} {...props}>{children}</BarChart>;
    case "pie":
      return <PieChart {...props}>{children}</PieChart>;
    case "area":
      return <AreaChart data={data} {...props}>{children}</AreaChart>;
    case "radar":
      return <RadarChart {...props}>{children}</RadarChart>;
    default:
      return <div>Invalid chart type</div>;
  }
}
