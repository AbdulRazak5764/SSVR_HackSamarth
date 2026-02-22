'use client';

import { useState } from 'react';
import { Prediction, RiskAssessmentInput } from '@/lib/types';
import { predictRisks } from '@/lib/predictions';
import { PredictionForm } from '@/components/forms/PredictionForm';
import { RiskGauge } from '@/components/risk-widgets/RiskGauge';
import { RiskCard } from '@/components/risk-widgets/RiskCard';
import { ExplanationChart } from '@/components/risk-widgets/ExplanationChart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function DashboardPage() {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handlePredictionSubmit = async (data: RiskAssessmentInput) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const { scores, explanation } = predictRisks(data);

      const newPrediction: Prediction = {
        id: Date.now().toString(),
        userId: 'user-1',
        healthFactors: data.healthFactors,
        financialFactors: data.financialFactors,
        scamVulnerabilityFactors: data.scamVulnerabilityFactors,
        riskScores: scores,
        explanation,
        createdAt: new Date(),
      };

      setPrediction(newPrediction);
      setShowForm(false);
    } catch (error) {
      console.error('Error getting prediction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Digital Twin Risk Assessment
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Understand your personal risk profile across health, financial, and
              cybersecurity dimensions
            </p>
          </div>

          <PredictionForm
            onSubmit={handlePredictionSubmit}
            isLoading={isLoading}
          />

          <div className="mt-8 rounded-lg bg-blue-50 p-6 border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">
              How This Works
            </h3>
            <p className="text-sm text-blue-800">
              Our AI Digital Twin analyzes three key risk dimensions:
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-3 text-sm text-blue-800 md:grid-cols-3">
              <li>
                <strong>Health:</strong> Lifestyle and wellness factors
              </li>
              <li>
                <strong>Financial:</strong> Income, debt, and savings patterns
              </li>
              <li>
                <strong>Scam:</strong> Vulnerability to fraud and scams
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (!prediction) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Risk Profile</h1>
            <p className="mt-1 text-gray-600">
              Assessment from {new Date(prediction.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Button
            onClick={() => {
              setShowForm(true);
              setPrediction(null);
            }}
            variant="outline"
          >
            New Assessment
          </Button>
        </div>

        {/* Risk Gauges Grid */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="flex flex-col items-center justify-center p-6">
            <RiskGauge
              score={prediction.riskScores.healthRisk}
              label="Health Risk"
              size="md"
            />
          </Card>
          <Card className="flex flex-col items-center justify-center p-6">
            <RiskGauge
              score={prediction.riskScores.financialRisk}
              label="Financial Risk"
              size="md"
            />
          </Card>
          <Card className="flex flex-col items-center justify-center p-6">
            <RiskGauge
              score={prediction.riskScores.scamRisk}
              label="Scam Risk"
              size="md"
            />
          </Card>
        </div>

        {/* Overall Risk Card */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Overall Risk Score
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <div
                className="mb-2 text-6xl font-bold"
                style={{
                  color: prediction.riskScores.overallRisk < 30
                    ? '#10b981'
                    : prediction.riskScores.overallRisk < 50
                      ? '#f59e0b'
                      : prediction.riskScores.overallRisk < 75
                        ? '#ef4444'
                        : '#991b1b',
                }}
              >
                {prediction.riskScores.overallRisk}
              </div>
              <p className="text-gray-600">
                Out of 100 (weighted average of all risk categories)
              </p>
            </div>
            <div className="h-32 w-full max-w-xs rounded-lg bg-gradient-to-r from-green-500 to-red-500 opacity-30" />
          </div>
        </Card>

        {/* Risk Cards Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <RiskCard
            title="Health Risk"
            score={prediction.riskScores.healthRisk}
            description="Based on lifestyle and wellness"
            onClick={() =>
              setExpandedSection(
                expandedSection === 'health' ? null : 'health'
              )
            }
          />
          <RiskCard
            title="Financial Risk"
            score={prediction.riskScores.financialRisk}
            description="Based on income and debt"
            onClick={() =>
              setExpandedSection(
                expandedSection === 'financial' ? null : 'financial'
              )
            }
          />
          <RiskCard
            title="Scam Risk"
            score={prediction.riskScores.scamRisk}
            description="Based on cyber awareness"
            onClick={() =>
              setExpandedSection(
                expandedSection === 'scam' ? null : 'scam'
              )
            }
          />
        </div>

        {/* Detailed Explanations */}
        <div className="space-y-6">
          {expandedSection === 'health' && (
            <Card className="p-6">
              <ExplanationChart
                data={prediction.explanation.healthExplanation}
                title="Health Risk Factors - SHAP Explanation"
                height={350}
              />
            </Card>
          )}

          {expandedSection === 'financial' && (
            <Card className="p-6">
              <ExplanationChart
                data={prediction.explanation.financialExplanation}
                title="Financial Risk Factors - SHAP Explanation"
                height={350}
              />
            </Card>
          )}

          {expandedSection === 'scam' && (
            <Card className="p-6">
              <ExplanationChart
                data={prediction.explanation.scamExplanation}
                title="Scam Risk Factors - SHAP Explanation"
                height={350}
              />
            </Card>
          )}
        </div>

        {/* Recommendations Section */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Personalized Recommendations
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {prediction.riskScores.healthRisk > 50 && (
              <div className="rounded-lg bg-white p-4">
                <h3 className="font-semibold text-red-600 mb-2">Health</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Increase exercise frequency</li>
                  <li>Improve sleep quality</li>
                  <li>Reduce stress levels</li>
                </ul>
              </div>
            )}
            {prediction.riskScores.financialRisk > 50 && (
              <div className="rounded-lg bg-white p-4">
                <h3 className="font-semibold text-amber-600 mb-2">Financial</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Build emergency fund</li>
                  <li>Reduce debt ratio</li>
                  <li>Increase savings rate</li>
                </ul>
              </div>
            )}
            {prediction.riskScores.scamRisk > 50 && (
              <div className="rounded-lg bg-white p-4">
                <h3 className="font-semibold text-purple-600 mb-2">Cybersecurity</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Improve password hygiene</li>
                  <li>Enable 2FA on accounts</li>
                  <li>Verify before clicking links</li>
                </ul>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
