
import * as React from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
  ScatterChart,
  Scatter,
} from "recharts"

export interface ChartConfig {
  data: Record<string, any>[]
  dataKey: string
  valueKey: string
  name?: string
  stroke?: string
  strokeWidth?: number
  strokeColor?: string
  strokeLinecap?: "butt" | "round" | "square"
  strokeLinejoin?: "bevel" | "miter" | "round"
  fill?: string
  fillColor?: string
  fillOpacity?: number
  color?: string
  colors?: string[]
  colorKey?: string
  innerRadius?: string
  outerRadius?: string
  radius?: number
  paddingAngle?: number
  angle?: number
  cx?: string
  cy?: string
  children?: React.ReactNode
}

export function Chart({
  children,
  className,
}: {
  children: React.ReactElement | React.ReactElement[]
  className?: string
}) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

export function ChartArea({
  data,
  dataKey,
  valueKey,
  name,
  stroke,
  strokeColor,
  strokeWidth,
  strokeLinecap,
  strokeLinejoin,
  fill,
  fillColor,
  fillOpacity,
  color,
  children,
  ...props
}: ChartConfig) {
  return (
    <AreaChart data={data} {...props}>
      {children}
      <Area
        type="monotone"
        dataKey={valueKey}
        name={name}
        stroke={stroke || strokeColor || color || "#0ea5e9"}
        strokeWidth={strokeWidth || 2}
        strokeLinecap={strokeLinecap || "round"}
        strokeLinejoin={strokeLinejoin || "round"}
        fill={fill || fillColor || color || "#0ea5e9"}
        fillOpacity={fillOpacity || 0.2}
        activeDot={{ r: 6 }}
      />
    </AreaChart>
  )
}

export function ChartLineArea({
  data,
  dataKey,
  valueKey,
  name,
  stroke,
  strokeColor,
  strokeWidth,
  strokeLinecap,
  strokeLinejoin,
  fill,
  fillColor,
  fillOpacity,
  color,
  children,
  ...props
}: ChartConfig) {
  return (
    <AreaChart data={data} {...props}>
      {children}
      <Line
        type="monotone"
        dataKey={valueKey}
        name={name}
        stroke={stroke || strokeColor || color || "#0ea5e9"}
        strokeWidth={strokeWidth || 2}
        strokeLinecap={strokeLinecap || "round"}
        strokeLinejoin={strokeLinejoin || "round"}
        activeDot={{ r: 6 }}
        dot={{
          r: 4,
          fill: "white",
          strokeWidth: 2,
          stroke: stroke || strokeColor || color || "#0ea5e9",
        }}
      />
      <Area
        type="monotone"
        dataKey={valueKey}
        name={name}
        fill={fill || fillColor || color || "#0ea5e9"}
        fillOpacity={fillOpacity || 0.2}
        stroke="transparent"
      />
    </AreaChart>
  )
}

export function ChartLine({
  data,
  dataKey,
  valueKey,
  name,
  stroke,
  strokeColor,
  strokeWidth,
  strokeLinecap,
  strokeLinejoin,
  color,
  children,
  ...props
}: ChartConfig) {
  return (
    <LineChart data={data} {...props}>
      {children}
      <Line
        type="monotone"
        dataKey={valueKey}
        name={name}
        stroke={stroke || strokeColor || color || "#0ea5e9"}
        strokeWidth={strokeWidth || 2}
        strokeLinecap={strokeLinecap || "round"}
        strokeLinejoin={strokeLinejoin || "round"}
        activeDot={{ r: 6 }}
        dot={{
          r: 4,
          fill: "white",
          strokeWidth: 2,
          stroke: stroke || strokeColor || color || "#0ea5e9",
        }}
      />
    </LineChart>
  )
}

export function ChartBar({
  data,
  dataKey,
  valueKey,
  name,
  fill,
  fillColor,
  color,
  radius = 6,
  children,
  ...props
}: ChartConfig) {
  return (
    <BarChart data={data} {...props}>
      {children}
      <Bar
        dataKey={valueKey}
        name={name}
        fill={fill || fillColor || color || "#0ea5e9"}
        radius={radius}
      />
    </BarChart>
  )
}

export function ChartPie({
  data,
  dataKey,
  valueKey,
  colors = ["#0ea5e9", "#6366f1", "#ec4899", "#10b981", "#f59e0b", "#ef4444"],
  colorKey,
  innerRadius = "0",
  outerRadius = "80%",
  paddingAngle,
  children,
  ...props
}: Partial<ChartConfig>) {
  return (
    <PieChart {...props}>
      {children}
      {data && dataKey && valueKey && (
        <Pie
          data={data}
          nameKey={dataKey}
          dataKey={valueKey}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={paddingAngle || 8}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colorKey ? entry[colorKey] : colors[index % colors.length]}
            />
          ))}
        </Pie>
      )}
    </PieChart>
  )
}

export function ChartRadar({
  children,
  ...props
}: Partial<ChartConfig>) {
  return (
    <RadarChart cx="50%" cy="50%" outerRadius="80%" {...props}>
      <PolarGrid />
      <PolarAngleAxis dataKey="category" />
      <PolarRadiusAxis angle={30} domain={[0, 100]} />
      {children}
    </RadarChart>
  )
}

export function ChartTitle({ children }: { children: React.ReactNode }) {
  return (
    <text
      x="50%"
      y={24}
      textAnchor="middle"
      className="fill-primary recharts-text"
      style={{
        fontSize: "16px",
        fontWeight: 500,
      }}
    >
      {children}
    </text>
  )
}

export function ChartTooltip() {
  return <Tooltip cursor={{ fillOpacity: 0.15 }} />
}

export function ChartXAxis(props: React.ComponentPropsWithoutRef<typeof XAxis>) {
  return <XAxis axisLine={false} tickLine={false} {...props} />
}

export function ChartYAxis(props: React.ComponentPropsWithoutRef<typeof YAxis>) {
  return <YAxis axisLine={false} tickLine={false} {...props} />
}

export function ChartLegend(props: React.ComponentPropsWithoutRef<typeof Legend>) {
  return <Legend {...props} />
}

export function ChartGrid(props: React.ComponentPropsWithoutRef<typeof CartesianGrid>) {
  return <CartesianGrid strokeDasharray="3 3" {...props} />
}

export function ChartLineSeries({
  data,
  dataKey,
  valueKey,
  name,
  strokeColor = "#0ea5e9",
  strokeWidth = 2,
  strokeLinecap = "round",
  strokeLinejoin = "round",
  dot = true,
}: {
  data: any[]
  dataKey: string
  valueKey: string
  name?: string
  strokeColor?: string
  strokeWidth?: number
  strokeLinecap?: "butt" | "round" | "square"
  strokeLinejoin?: "bevel" | "miter" | "round"
  dot?: boolean | object
}) {
  return (
    <Line
      type="monotone"
      dataKey={valueKey}
      name={name || valueKey}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      activeDot={{ r: 6 }}
      dot={
        dot === true
          ? {
              r: 4,
              fill: "white",
              strokeWidth: 2,
              stroke: strokeColor,
            }
          : dot
      }
    />
  )
}

export function ChartBarSeries({
  data,
  dataKey,
  valueKey,
  name,
  color = "#0ea5e9",
  radius = 6,
}: {
  data: any[]
  dataKey: string
  valueKey: string
  name?: string
  color?: string
  radius?: number
}) {
  return (
    <Bar
      dataKey={valueKey}
      name={name || valueKey}
      fill={color}
      radius={radius}
      barSize={30}
    />
  )
}

export function ChartPieSeries({
  data,
  dataKey,
  valueKey,
  colors = ["#0ea5e9", "#6366f1", "#ec4899", "#10b981", "#f59e0b", "#ef4444"],
  colorKey,
  innerRadius = "0",
  outerRadius = "80%",
  paddingAngle,
  name,
}: {
  data: any[]
  dataKey: string
  valueKey: string
  name?: string
  colors?: string[]
  colorKey?: string
  innerRadius?: string | number
  outerRadius?: string | number
  paddingAngle?: number
}) {
  return (
    <Pie
      data={data}
      nameKey={dataKey}
      dataKey={valueKey}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      paddingAngle={paddingAngle || 8}
      fill="#8884d8"
      label={({ name, percent }) =>
        `${name}: ${(percent * 100).toFixed(0)}%`
      }
    >
      {data.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={colorKey ? entry[colorKey] : colors[index % colors.length]}
        />
      ))}
    </Pie>
  )
}

export function ChartRadarSeries({
  data,
  dataKey,
  valueKey,
  name,
  stroke = "#8884d8",
  fill = "#8884d8",
  fillOpacity = 0.6,
}: {
  data: any[]
  dataKey: string
  valueKey: string
  name?: string
  stroke?: string
  fill?: string
  fillOpacity?: number
}) {
  return (
    <Radar
      name={name || valueKey}
      dataKey={valueKey}
      stroke={stroke}
      fill={fill}
      fillOpacity={fillOpacity}
    />
  )
}
