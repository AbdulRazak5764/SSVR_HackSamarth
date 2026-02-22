'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export interface TrendDataPoint {
  date: string;
  healthRisk: number;
  financialRisk: number;
  scamRisk: number;
  overallRisk: number;
}

interface RiskTrendProps {
  data: TrendDataPoint[];
  height?: number;
}

export function RiskTrend({ data, height = 300 }: RiskTrendProps) {
  return (
    <div className="w-full">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Risk Trends Over Time
      </h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            label={{ value: 'Risk Score', angle: -90, position: 'insideLeft' }}
            stroke="#6b7280"
          />
          <Tooltip
            formatter={(value: any) => {
              if (typeof value === 'number') {
                return Math.round(value);
              }
              return value;
            }}
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="healthRisk"
            stroke="#ef4444"
            name="Health Risk"
            dot={{ fill: '#ef4444', r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="financialRisk"
            stroke="#f59e0b"
            name="Financial Risk"
            dot={{ fill: '#f59e0b', r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="scamRisk"
            stroke="#8b5cf6"
            name="Scam Risk"
            dot={{ fill: '#8b5cf6', r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="overallRisk"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Overall Risk"
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
