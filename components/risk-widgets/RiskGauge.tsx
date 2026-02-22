'use client';

import { getRiskColor, getRiskLevel } from '@/lib/types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface RiskGaugeProps {
  score: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

export function RiskGauge({ score, label, size = 'md' }: RiskGaugeProps) {
  const riskLevel = getRiskLevel(score);
  const color = getRiskColor(score);

  const sizeClasses = {
    sm: 'h-32 w-32',
    md: 'h-48 w-48',
    lg: 'h-64 w-64',
  };

  const textSizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
  };

  const labelSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Create gauge data (0-100 scale)
  const gaugeData = [
    {
      name: 'Risk',
      value: score,
      fill: color,
    },
    {
      name: 'Safe',
      value: 100 - score,
      fill: '#e5e7eb',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative" style={{ width: '100%', maxWidth: '280px' }}>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={gaugeData}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={0}
              dataKey="value"
            >
              {gaugeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Score display overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`${textSizes[size]} font-bold`} style={{ color }}>
            {score}
          </div>
          <div className="text-xs text-gray-600">out of 100</div>
        </div>
      </div>

      <div className="text-center">
        <h3 className={`${labelSizes[size]} font-semibold text-gray-900`}>
          {label}
        </h3>
        <p
          className={`${labelSizes[size]} mt-1 font-medium`}
          style={{ color }}
        >
          {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
        </p>
      </div>
    </div>
  );
}
