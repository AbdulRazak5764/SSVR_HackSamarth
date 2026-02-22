'use client';

import { HealthFactors } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface HealthInputStepProps {
  data: HealthFactors;
  onChange: (field: keyof HealthFactors, value: any) => void;
}

export function HealthInputStep({ data, onChange }: HealthInputStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="exercise" className="text-base">
          Exercise Frequency (0-100)
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          How often do you exercise? (100 = daily, 0 = never)
        </p>
        <Input
          id="exercise"
          type="range"
          min="0"
          max="100"
          value={data.exerciseFrequency}
          onChange={(e) => onChange('exerciseFrequency', Number(e.target.value))}
          className="h-2"
        />
        <div className="mt-1 text-sm font-medium text-blue-600">
          {data.exerciseFrequency}
        </div>
      </div>

      <div>
        <Label htmlFor="sleep" className="text-base">
          Sleep Hours per Night
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          Average hours of sleep (recommended: 7-9)
        </p>
        <Input
          id="sleep"
          type="number"
          min="0"
          max="24"
          step="0.5"
          value={data.sleepHours}
          onChange={(e) => onChange('sleepHours', Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <Label htmlFor="stress" className="text-base">
          Stress Level (0-100)
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          Your typical stress level (100 = extremely stressed)
        </p>
        <Input
          id="stress"
          type="range"
          min="0"
          max="100"
          value={data.stressLevel}
          onChange={(e) => onChange('stressLevel', Number(e.target.value))}
          className="h-2"
        />
        <div className="mt-1 text-sm font-medium text-blue-600">
          {data.stressLevel}
        </div>
      </div>

      <div>
        <Label htmlFor="alcohol" className="text-base">
          Alcohol Consumption (0-100)
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          Your alcohol consumption level (100 = excessive)
        </p>
        <Input
          id="alcohol"
          type="range"
          min="0"
          max="100"
          value={data.alcoholConsumption}
          onChange={(e) =>
            onChange('alcoholConsumption', Number(e.target.value))
          }
          className="h-2"
        />
        <div className="mt-1 text-sm font-medium text-blue-600">
          {data.alcoholConsumption}
        </div>
      </div>

      <div>
        <Label htmlFor="smoking" className="text-base">
          Smoking Status (0-100)
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          Smoking frequency (100 = heavy smoker, 0 = non-smoker)
        </p>
        <Input
          id="smoking"
          type="range"
          min="0"
          max="100"
          value={data.smokingStatus}
          onChange={(e) => onChange('smokingStatus', Number(e.target.value))}
          className="h-2"
        />
        <div className="mt-1 text-sm font-medium text-blue-600">
          {data.smokingStatus}
        </div>
      </div>

      <div>
        <Label htmlFor="diet" className="text-base">
          Diet Quality (0-100)
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          Your diet quality (100 = excellent, 0 = poor)
        </p>
        <Input
          id="diet"
          type="range"
          min="0"
          max="100"
          value={data.dietQuality}
          onChange={(e) => onChange('dietQuality', Number(e.target.value))}
          className="h-2"
        />
        <div className="mt-1 text-sm font-medium text-blue-600">
          {data.dietQuality}
        </div>
      </div>

      <div>
        <Label htmlFor="medical" className="text-base">
          Medical Conditions
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          Enter conditions separated by commas (e.g., diabetes, hypertension)
        </p>
        <Input
          id="medical"
          type="text"
          placeholder="e.g., diabetes, hypertension"
          value={data.medicalHistory.join(', ')}
          onChange={(e) =>
            onChange(
              'medicalHistory',
              e.target.value
                .split(',')
                .map((s) => s.trim())
                .filter((s) => s.length > 0)
            )
          }
          className="w-full"
        />
      </div>
    </div>
  );
}
