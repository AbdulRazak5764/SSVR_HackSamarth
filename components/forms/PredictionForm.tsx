'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RiskAssessmentInput } from '@/lib/types';
import { HealthInputStep } from './HealthInputStep';
import { FinancialInputStep } from './FinancialInputStep';
import { ScamInputStep } from './ScamInputStep';

interface PredictionFormProps {
  onSubmit: (data: RiskAssessmentInput) => Promise<void>;
  isLoading?: boolean;
}

export function PredictionForm({
  onSubmit,
  isLoading = false,
}: PredictionFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RiskAssessmentInput>({
    healthFactors: {
      exerciseFrequency: 50,
      sleepHours: 7,
      stressLevel: 50,
      alcoholConsumption: 30,
      smokingStatus: 0,
      dietQuality: 60,
      medicalHistory: [],
    },
    financialFactors: {
      monthlyIncome: 50000,
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
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleHealthChange = (
    field: keyof typeof formData.healthFactors,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      healthFactors: {
        ...prev.healthFactors,
        [field]: value,
      },
    }));
  };

  const handleFinancialChange = (
    field: keyof typeof formData.financialFactors,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      financialFactors: {
        ...prev.financialFactors,
        [field]: value,
      },
    }));
  };

  const handleScamChange = (
    field: keyof typeof formData.scamVulnerabilityFactors,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      scamVulnerabilityFactors: {
        ...prev.scamVulnerabilityFactors,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="p-6">
        {/* Step indicator */}
        <div className="mb-8">
          <div className="flex justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold text-sm ${
                    s <= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`h-1 flex-1 ${
                      s < step ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="font-semibold text-gray-900">
              {step === 1
                ? 'Health Factors'
                : step === 2
                  ? 'Financial Factors'
                  : 'Scam Vulnerability'}
            </span>
          </div>
        </div>

        {/* Form steps */}
        <div className="min-h-96">
          {step === 1 && (
            <HealthInputStep
              data={formData.healthFactors}
              onChange={handleHealthChange}
            />
          )}
          {step === 2 && (
            <FinancialInputStep
              data={formData.financialFactors}
              onChange={handleFinancialChange}
            />
          )}
          {step === 3 && (
            <ScamInputStep
              data={formData.scamVulnerabilityFactors}
              onChange={handleScamChange}
            />
          )}
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1 || isLoading}
          >
            Previous
          </Button>

          {step < 3 ? (
            <Button type="button" onClick={handleNext} disabled={isLoading}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Analyzing...' : 'Get Risk Assessment'}
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
