import { 
  RiskScores, 
  ExplanationData, 
  FeatureImportance,
  RiskAssessmentInput 
} from './types';

/**
 * Mock prediction function - simulates ML models
 * In production, this would call actual trained models
 */
export function predictRisks(input: RiskAssessmentInput): {
  scores: RiskScores;
  explanation: ExplanationData;
} {
  const { healthFactors, financialFactors, scamVulnerabilityFactors } = input;

  // Health Risk Calculation
  const healthRisk = calculateHealthRisk(healthFactors);
  const healthExplanation = getHealthExplanation(healthFactors);

  // Financial Risk Calculation
  const financialRisk = calculateFinancialRisk(financialFactors);
  const financialExplanation = getFinancialExplanation(financialFactors);

  // Scam Risk Calculation
  const scamRisk = calculateScamRisk(scamVulnerabilityFactors);
  const scamExplanation = getScamExplanation(scamVulnerabilityFactors);

  // Overall Risk (weighted average)
  const overallRisk = (healthRisk * 0.35 + financialRisk * 0.35 + scamRisk * 0.3);

  return {
    scores: {
      healthRisk,
      financialRisk,
      scamRisk,
      overallRisk: Math.round(overallRisk),
    },
    explanation: {
      healthExplanation,
      financialExplanation,
      scamExplanation,
    },
  };
}

function calculateHealthRisk(factors: any): number {
  let score = 0;

  // Positive factors (lower risk)
  score += (factors.exerciseFrequency * 0.15); // Higher exercise = lower risk
  score += ((100 - factors.stressLevel) * 0.15); // Lower stress = lower risk
  score += (factors.dietQuality * 0.1);

  // Negative factors (higher risk)
  score += ((100 - factors.sleepHours / 24 * 100) * 0.1); // 8 hours ideal
  score += (factors.alcoholConsumption * 0.15);
  score += (factors.smokingStatus * 0.2);

  // Medical history penalty
  score += (Math.min(factors.medicalHistory.length * 5, 15));

  // Invert to get risk score (higher = more risk)
  return Math.round(100 - Math.min(Math.max(score, 0), 100));
}

function calculateFinancialRisk(factors: any): number {
  let score = 0;

  const savingsRatio = factors.monthlyIncome > 0 
    ? ((factors.monthlyIncome - factors.monthlyExpenses) / factors.monthlyIncome) * 100
    : 0;

  // Positive factors
  score += (factors.savingsRate * 0.2);
  score += (factors.creditScore / 8.5); // Normalized to 0-100
  score += ((100 - factors.debtRatio) * 0.2);
  score += (factors.investmentKnowledge * 0.15);
  if (factors.emergencyFund) score += 15;

  // Negative factors
  score += (Math.min(factors.debtRatio, 100) * 0.15);

  return Math.round(100 - Math.min(Math.max(score, 0), 100));
}

function calculateScamRisk(factors: any): number {
  let score = 0;

  // Positive factors (lower risk)
  score += (factors.technicalLiteracy * 0.2);
  score += (factors.passwordHygiene * 0.25);
  score += (factors.verificationHabits * 0.2);

  // Negative factors (higher risk)
  score += (factors.publicPersonalInfo * 0.15);
  score += (factors.onlineActivityFrequency * 0.1);
  score += (factors.pastIncidents * 5); // 5 points per past incident

  // Lifestyle factor
  const riskMultiplier = factors.onlineActivityFrequency > 70 ? 1.1 : 1;

  return Math.round(Math.min((100 - Math.max(score, 0)) * riskMultiplier, 100));
}

function getHealthExplanation(factors: any): FeatureImportance[] {
  return [
    {
      feature: 'Smoking Status',
      importance: 20,
      direction: factors.smokingStatus > 30 ? 'positive' : 'negative',
      contribution: factors.smokingStatus * 0.2,
    },
    {
      feature: 'Alcohol Consumption',
      importance: 15,
      direction: factors.alcoholConsumption > 40 ? 'positive' : 'negative',
      contribution: factors.alcoholConsumption * 0.15,
    },
    {
      feature: 'Stress Level',
      importance: 15,
      direction: factors.stressLevel > 60 ? 'positive' : 'negative',
      contribution: Math.abs((factors.stressLevel - 50) * 0.1),
    },
    {
      feature: 'Exercise Frequency',
      importance: 15,
      direction: factors.exerciseFrequency > 50 ? 'negative' : 'positive',
      contribution: (100 - factors.exerciseFrequency) * 0.08,
    },
    {
      feature: 'Sleep Hours',
      importance: 10,
      direction: Math.abs(factors.sleepHours - 8) > 2 ? 'positive' : 'negative',
      contribution: Math.abs(factors.sleepHours - 8) * 5,
    },
    {
      feature: 'Medical History',
      importance: 25,
      direction: 'positive',
      contribution: Math.min(factors.medicalHistory.length * 5, 25),
    },
  ];
}

function getFinancialExplanation(factors: any): FeatureImportance[] {
  return [
    {
      feature: 'Debt Ratio',
      importance: 20,
      direction: factors.debtRatio > 50 ? 'positive' : 'negative',
      contribution: factors.debtRatio * 0.2,
    },
    {
      feature: 'Credit Score',
      importance: 18,
      direction: factors.creditScore < 650 ? 'positive' : 'negative',
      contribution: Math.abs((factors.creditScore - 750) / 10),
    },
    {
      feature: 'Savings Rate',
      importance: 20,
      direction: factors.savingsRate > 20 ? 'negative' : 'positive',
      contribution: (100 - factors.savingsRate) * 0.1,
    },
    {
      feature: 'Investment Knowledge',
      importance: 15,
      direction: factors.investmentKnowledge < 40 ? 'positive' : 'negative',
      contribution: (100 - factors.investmentKnowledge) * 0.08,
    },
    {
      feature: 'Emergency Fund',
      importance: 15,
      direction: !factors.emergencyFund ? 'positive' : 'negative',
      contribution: !factors.emergencyFund ? 15 : 0,
    },
    {
      feature: 'Income Stability',
      importance: 12,
      direction: factors.monthlyIncome < 30000 ? 'positive' : 'negative',
      contribution: Math.max(0, (30000 - factors.monthlyIncome) / 10000),
    },
  ];
}

function getScamExplanation(factors: any): FeatureImportance[] {
  return [
    {
      feature: 'Password Hygiene',
      importance: 25,
      direction: factors.passwordHygiene < 50 ? 'positive' : 'negative',
      contribution: (100 - factors.passwordHygiene) * 0.15,
    },
    {
      feature: 'Technical Literacy',
      importance: 20,
      direction: factors.technicalLiteracy < 40 ? 'positive' : 'negative',
      contribution: (100 - factors.technicalLiteracy) * 0.12,
    },
    {
      feature: 'Verification Habits',
      importance: 20,
      direction: factors.verificationHabits < 50 ? 'positive' : 'negative',
      contribution: (100 - factors.verificationHabits) * 0.12,
    },
    {
      feature: 'Public Personal Info',
      importance: 15,
      direction: factors.publicPersonalInfo > 50 ? 'positive' : 'negative',
      contribution: factors.publicPersonalInfo * 0.08,
    },
    {
      feature: 'Past Incidents',
      importance: 12,
      direction: factors.pastIncidents > 0 ? 'positive' : 'negative',
      contribution: factors.pastIncidents * 5,
    },
    {
      feature: 'Online Activity',
      importance: 8,
      direction: factors.onlineActivityFrequency > 70 ? 'positive' : 'negative',
      contribution: (factors.onlineActivityFrequency / 100) * 4,
    },
  ];
}
