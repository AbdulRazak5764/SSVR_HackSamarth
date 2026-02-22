import { z } from 'zod';

export const HealthFactorsSchema = z.object({
  exerciseFrequency: z.number().min(0).max(100),
  sleepHours: z.number().min(0).max(24),
  stressLevel: z.number().min(0).max(100),
  alcoholConsumption: z.number().min(0).max(100),
  smokingStatus: z.number().min(0).max(100),
  dietQuality: z.number().min(0).max(100),
  medicalHistory: z.array(z.string()),
});

export const FinancialFactorsSchema = z.object({
  monthlyIncome: z.number().min(0),
  monthlyExpenses: z.number().min(0),
  savingsRate: z.number().min(0).max(100),
  debtRatio: z.number().min(0).max(100),
  investmentKnowledge: z.number().min(0).max(100),
  emergencyFund: z.boolean(),
  creditScore: z.number().min(300).max(850),
});

export const ScamVulnerabilityFactorsSchema = z.object({
  technicalLiteracy: z.number().min(0).max(100),
  onlineActivityFrequency: z.number().min(0).max(100),
  publicPersonalInfo: z.number().min(0).max(100),
  passwordHygiene: z.number().min(0).max(100),
  verificationHabits: z.number().min(0).max(100),
  pastIncidents: z.number().min(0).max(5),
});

export const RiskAssessmentInputSchema = z.object({
  healthFactors: HealthFactorsSchema,
  financialFactors: FinancialFactorsSchema,
  scamVulnerabilityFactors: ScamVulnerabilityFactorsSchema,
});

export type HealthFactors = z.infer<typeof HealthFactorsSchema>;
export type FinancialFactors = z.infer<typeof FinancialFactorsSchema>;
export type ScamVulnerabilityFactors = z.infer<typeof ScamVulnerabilityFactorsSchema>;
export type RiskAssessmentInput = z.infer<typeof RiskAssessmentInputSchema>;
