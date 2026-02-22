'use client';

import { FeatureImportance } from '@/lib/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ExplanationChartProps {
  data: FeatureImportance[];
  title: string;
  height?: number;
}

export function ExplanationChart({
  data,
  title,
  height = 300,
}: ExplanationChartProps) {
  // Sort by importance descending
  const sortedData = [...data].sort((a, b) => b.importance - a.importance);

  return (
    <div className="w-full">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={sortedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="feature"
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            label={{ value: 'Importance (%)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            formatter={(value: any) => {
              if (typeof value === 'number') {
                return `${Math.round(value)}%`;
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
          <Bar
            dataKey="importance"
            fill="#3b82f6"
            name="Feature Importance"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Feature impact summary */}
      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {sortedData.slice(0, 6).map((feature) => (
          <div key={feature.feature} className="rounded-lg bg-gray-50 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {feature.feature}
                </p>
                <p className="text-xs text-gray-600">
                  {feature.direction === 'positive'
                    ? 'Increases Risk'
                    : 'Decreases Risk'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">
                  {Math.round(feature.importance)}%
                </p>
                <p className="text-xs text-gray-600">
                  +{Math.round(feature.contribution)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
