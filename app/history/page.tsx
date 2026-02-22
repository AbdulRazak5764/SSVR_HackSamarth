'use client';

import { useState, useEffect } from 'react';
import { Prediction } from '@/lib/types';
import { RiskTrend, TrendDataPoint } from '@/components/risk-widgets/RiskTrend';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data for demonstration
const mockPredictions: Prediction[] = [
  {
    id: '1',
    userId: 'user-1',
    healthFactors: {
      exerciseFrequency: 40,
      sleepHours: 6.5,
      stressLevel: 65,
      alcoholConsumption: 35,
      smokingStatus: 0,
      dietQuality: 55,
      medicalHistory: [],
    },
    financialFactors: {
      monthlyIncome: 45000,
      monthlyExpenses: 3200,
      savingsRate: 15,
      debtRatio: 35,
      investmentKnowledge: 45,
      emergencyFund: false,
      creditScore: 680,
    },
    scamVulnerabilityFactors: {
      technicalLiteracy: 55,
      onlineActivityFrequency: 75,
      publicPersonalInfo: 45,
      passwordHygiene: 65,
      verificationHabits: 55,
      pastIncidents: 0,
    },
    riskScores: {
      healthRisk: 58,
      financialRisk: 52,
      scamRisk: 45,
      overallRisk: 52,
    },
    explanation: {
      healthExplanation: [],
      financialExplanation: [],
      scamExplanation: [],
    },
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    userId: 'user-1',
    healthFactors: {
      exerciseFrequency: 50,
      sleepHours: 7,
      stressLevel: 55,
      alcoholConsumption: 30,
      smokingStatus: 0,
      dietQuality: 60,
      medicalHistory: [],
    },
    financialFactors: {
      monthlyIncome: 48000,
      monthlyExpenses: 3000,
      savingsRate: 20,
      debtRatio: 30,
      investmentKnowledge: 50,
      emergencyFund: true,
      creditScore: 700,
    },
    scamVulnerabilityFactors: {
      technicalLiteracy: 60,
      onlineActivityFrequency: 70,
      publicPersonalInfo: 40,
      passwordHygiene: 70,
      verificationHabits: 60,
      pastIncidents: 0,
    },
    riskScores: {
      healthRisk: 48,
      financialRisk: 42,
      scamRisk: 40,
      overallRisk: 43,
    },
    explanation: {
      healthExplanation: [],
      financialExplanation: [],
      scamExplanation: [],
    },
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    userId: 'user-1',
    healthFactors: {
      exerciseFrequency: 60,
      sleepHours: 7.5,
      stressLevel: 45,
      alcoholConsumption: 25,
      smokingStatus: 0,
      dietQuality: 70,
      medicalHistory: [],
    },
    financialFactors: {
      monthlyIncome: 50000,
      monthlyExpenses: 2800,
      savingsRate: 25,
      debtRatio: 25,
      investmentKnowledge: 55,
      emergencyFund: true,
      creditScore: 720,
    },
    scamVulnerabilityFactors: {
      technicalLiteracy: 65,
      onlineActivityFrequency: 68,
      publicPersonalInfo: 35,
      passwordHygiene: 75,
      verificationHabits: 70,
      pastIncidents: 0,
    },
    riskScores: {
      healthRisk: 38,
      financialRisk: 35,
      scamRisk: 32,
      overallRisk: 35,
    },
    explanation: {
      healthExplanation: [],
      financialExplanation: [],
      scamExplanation: [],
    },
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    userId: 'user-1',
    healthFactors: {
      exerciseFrequency: 65,
      sleepHours: 8,
      stressLevel: 40,
      alcoholConsumption: 20,
      smokingStatus: 0,
      dietQuality: 75,
      medicalHistory: [],
    },
    financialFactors: {
      monthlyIncome: 52000,
      monthlyExpenses: 2700,
      savingsRate: 30,
      debtRatio: 20,
      investmentKnowledge: 60,
      emergencyFund: true,
      creditScore: 740,
    },
    scamVulnerabilityFactors: {
      technicalLiteracy: 70,
      onlineActivityFrequency: 65,
      publicPersonalInfo: 30,
      passwordHygiene: 80,
      verificationHabits: 75,
      pastIncidents: 0,
    },
    riskScores: {
      healthRisk: 32,
      financialRisk: 28,
      scamRisk: 25,
      overallRisk: 28,
    },
    explanation: {
      healthExplanation: [],
      financialExplanation: [],
      scamExplanation: [],
    },
    createdAt: new Date(),
  },
];

export default function HistoryPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [trendData, setTrendData] = useState<TrendDataPoint[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from the API
    setPredictions(mockPredictions);

    // Convert predictions to trend data
    const trend = mockPredictions.map((pred) => ({
      date: new Date(pred.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      healthRisk: pred.riskScores.healthRisk,
      financialRisk: pred.riskScores.financialRisk,
      scamRisk: pred.riskScores.scamRisk,
      overallRisk: pred.riskScores.overallRisk,
    }));

    setTrendData(trend);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Assessment History</h1>
          <p className="mt-2 text-gray-600">
            Track your risk profile changes over time
          </p>
        </div>

        {/* Trends Chart */}
        {trendData.length > 0 && (
          <Card className="mb-8 p-6">
            <RiskTrend data={trendData} height={400} />
          </Card>
        )}

        {/* Summary Stats */}
        {predictions.length > 0 && (
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card className="p-6">
              <p className="text-sm text-gray-600">Total Assessments</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {predictions.length}
              </p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-600">Latest Health Risk</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {predictions[predictions.length - 1].riskScores.healthRisk}
              </p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-600">Latest Financial Risk</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {predictions[predictions.length - 1].riskScores.financialRisk}
              </p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-600">Latest Scam Risk</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {predictions[predictions.length - 1].riskScores.scamRisk}
              </p>
            </Card>
          </div>
        )}

        {/* Predictions Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Health Risk
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Financial Risk
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Scam Risk
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Overall Risk
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((pred) => (
                  <tr key={pred.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(pred.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="inline-block h-2 w-2 rounded-full"
                          style={{
                            backgroundColor:
                              pred.riskScores.healthRisk < 30
                                ? '#10b981'
                                : pred.riskScores.healthRisk < 50
                                  ? '#f59e0b'
                                  : pred.riskScores.healthRisk < 75
                                    ? '#ef4444'
                                    : '#991b1b',
                          }}
                        />
                        {pred.riskScores.healthRisk}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="inline-block h-2 w-2 rounded-full"
                          style={{
                            backgroundColor:
                              pred.riskScores.financialRisk < 30
                                ? '#10b981'
                                : pred.riskScores.financialRisk < 50
                                  ? '#f59e0b'
                                  : pred.riskScores.financialRisk < 75
                                    ? '#ef4444'
                                    : '#991b1b',
                          }}
                        />
                        {pred.riskScores.financialRisk}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="inline-block h-2 w-2 rounded-full"
                          style={{
                            backgroundColor:
                              pred.riskScores.scamRisk < 30
                                ? '#10b981'
                                : pred.riskScores.scamRisk < 50
                                  ? '#f59e0b'
                                  : pred.riskScores.scamRisk < 75
                                    ? '#ef4444'
                                    : '#991b1b',
                          }}
                        />
                        {pred.riskScores.scamRisk}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      {pred.riskScores.overallRisk}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Link href="/dashboard">
            <Button>New Assessment</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
