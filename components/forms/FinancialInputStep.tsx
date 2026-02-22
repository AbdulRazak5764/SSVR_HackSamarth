'use client';

import { FinancialFactors } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface FinancialInputStepProps {
  data: FinancialFactors;
  onChange: (field: keyof FinancialFactors, value: any) => void;
}

export function FinancialInputStep({
  data,
  onChange,
}: FinancialInputStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="income" className="text-base">
          Monthly Income ($)
        </Label>
        <p className="text-sm text-gray-600 mb-2">Gross monthly income</p>
        <Input
          id="income"
          type="number"
          min="0"
          step="1000"
          value={data.monthlyIncome}
          onChange={(e) => onChange('monthlyIncome', Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <Label htmlFor="expenses" className="text-base">
          Monthly Expenses ($)
        </Label>
        <p className="text-sm text-gray-600 mb-2">Total monthly expenses</p>
        <Input
          id="expenses"
          type="number"
          min="0"
          step="100"
          value={data.monthlyExpenses}
          onChange={(e) => onChange('monthlyExpenses', Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <Label htmlFor="savings" className="text-base">
          Savings Rate (%)
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          Percentage of income you save (0-100)
        </p>
        <Input
          id="savings"
          type="range"
          min="0"
          max="100"
          value={data.savingsRate}
          onChange={(e) => onChange('savingsRate', Number(e.target.value))}
          className="h-2"
        />
        <div className="mt-1 text-sm font-medium text-blue-600">
          {data.savingsRate}%
        </div>
      </div>

      <div>
        <Label htmlFor="debt" className="text-base">
          Debt Ratio (%)
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          Total debt as percentage of income (0-100)
        </p>
        <Input
          id="debt"
          type="range"
          min="0"
          max="100"
          value={data.debtRatio}
          onChange={(e) => onChange('debtRatio', Number(e.target.value))}
          className="h-2"
        />
        <div className="mt-1 text-sm font-medium text-blue-600">
          {data.debtRatio}%
        </div>
      </div>

      <div>
        <Label htmlFor="investment" className="text-base">
          Investment Knowledge (0-100)
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          Your financial investment knowledge
        </p>
        <Input
          id="investment"
          type="range"
          min="0"
          max="100"
          value={data.investmentKnowledge}
          onChange={(e) =>
            onChange('investmentKnowledge', Number(e.target.value))
          }
          className="h-2"
        />
        <div className="mt-1 text-sm font-medium text-blue-600">
          {data.investmentKnowledge}
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
        <Checkbox
          id="emergency"
          checked={data.emergencyFund}
          onCheckedChange={(checked) =>
            onChange('emergencyFund', checked === true)
          }
        />
        <Label htmlFor="emergency" className="text-base font-normal">
          Do you have an emergency fund (3-6 months expenses)?
        </Label>
      </div>

      <div>
        <Label htmlFor="credit" className="text-base">
          Credit Score (300-850)
        </Label>
        <p className="text-sm text-gray-600 mb-2">Your credit score</p>
        <Input
          id="credit"
          type="number"
          min="300"
          max="850"
          step="10"
          value={data.creditScore}
          onChange={(e) => onChange('creditScore', Number(e.target.value))}
          className="w-full"
        />
        <div className="mt-2 text-sm text-gray-600">
          {data.creditScore < 580 && '⚠️ Poor'}
          {data.creditScore >= 580 && data.creditScore < 670 && '⚠️ Fair'}
          {data.creditScore >= 670 && data.creditScore < 740 && '✓ Good'}
          {data.creditScore >= 740 && data.creditScore < 800 && '✓ Very Good'}
          {data.creditScore >= 800 && '✓ Excellent'}
        </div>
      </div>
    </div>
  );
}
