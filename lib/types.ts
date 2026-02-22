// User and Risk Assessment Types

export interface User {
  id: string;
  name: string;
  age: number;
  income: number;
  occupation: string;
  lifestyleScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface HealthFactors {
  exerciseFrequency: number; // 0-100 (higher is better)
  sleepHours: number;
  stressLevel: number; // 0-100 (higher is worse)
  alcoholConsumption: number; // 0-100 (higher is worse)
  smokingStatus: number; // 0-100 (higher is worse)
  dietQuality: number; // 0-100 (higher is better)
  medicalHistory: string[];
}

export interface FinancialFactors {
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number; // 0-100
  debtRatio: number; // 0-100
  investmentKnowledge: number; // 0-100
  emergencyFund: boolean;
  creditScore: number; // 300-850
}

export interface ScamVulnerabilityFactors {
  technicalLiteracy: number; // 0-100 (higher is better)
  onlineActivityFrequency: number; // 0-100
  publicPersonalInfo: number; // 0-100 (higher is riskier)
  passwordHygiene: number; // 0-100 (higher is better)
  verificationHabits: number; // 0-100 (higher is better)
  pastIncidents: number; // 0-5
}

export interface RiskScores {
  healthRisk: number; // 0-100
  financialRisk: number; // 0-100
  scamRisk: number; // 0-100
  overallRisk: number; // 0-100
}

export interface Prediction {
  id: string;
  userId: string;
  healthFactors: HealthFactors;
  financialFactors: FinancialFactors;
  scamVulnerabilityFactors: ScamVulnerabilityFactors;
  riskScores: RiskScores;
  explanation: ExplanationData;
  createdAt: Date;
}

export interface ExplanationData {
  healthExplanation: FeatureImportance[];
  financialExplanation: FeatureImportance[];
  scamExplanation: FeatureImportance[];
}

export interface FeatureImportance {
  feature: string;
  importance: number; // 0-100
  direction: 'positive' | 'negative'; // positive = increases risk, negative = decreases risk
  contribution: number; // actual contribution to score
}

export interface RiskAssessmentInput {
  healthFactors: HealthFactors;
  financialFactors: FinancialFactors;
  scamVulnerabilityFactors: ScamVulnerabilityFactors;
}

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export function getRiskLevel(score: number): RiskLevel {
  if (score < 30) return 'low';
  if (score < 50) return 'moderate';
  if (score < 75) return 'high';
  return 'critical';
}

export function getRiskColor(score: number): string {
  const level = getRiskLevel(score);
  switch (level) {
    case 'low':
      return '#10b981'; // emerald
    case 'moderate':
      return '#f59e0b'; // amber
    case 'high':
      return '#ef4444'; // red
    case 'critical':
      return '#991b1b'; // dark red
  }
}
