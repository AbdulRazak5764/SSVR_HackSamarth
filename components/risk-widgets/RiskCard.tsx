'use client';

import { getRiskColor, getRiskLevel } from '@/lib/types';
import { Card } from '@/components/ui/card';

interface RiskCardProps {
  title: string;
  score: number;
  description?: string;
  onClick?: () => void;
}

export function RiskCard({
  title,
  score,
  description,
  onClick,
}: RiskCardProps) {
  const riskLevel = getRiskLevel(score);
  const color = getRiskColor(score);

  const statusBg = {
    low: 'bg-emerald-50 border-emerald-200',
    moderate: 'bg-amber-50 border-amber-200',
    high: 'bg-red-50 border-red-200',
    critical: 'bg-red-100 border-red-300',
  };

  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer transition-all hover:shadow-lg ${
        statusBg[riskLevel]
      } border`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {description && (
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            )}
          </div>
          <div className="text-right ml-4">
            <div className="text-3xl font-bold" style={{ color }}>
              {score}
            </div>
            <div className="text-xs font-medium text-gray-600">
              {riskLevel.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full transition-all"
            style={{
              width: `${score}%`,
              backgroundColor: color,
            }}
          />
        </div>

        {/* Risk level indicator */}
        <div className="mt-3 flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-xs font-medium text-gray-700 capitalize">
            {riskLevel} Risk
          </span>
        </div>
      </div>
    </Card>
  );
}
