'use client';

import { ScamVulnerabilityFactors } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ScamInputStepProps {
  data: ScamVulnerabilityFactors;
  onChange: (field: keyof ScamVulnerabilityFactors, value: any) => void;
}

export function ScamInputStep({ data, onChange }: ScamInputStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="technical" className="text-base">
          Technical Literacy (0-100)
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          Your technical knowledge and computer skills (100 = expert)
        </p>
        <Input
          id="technical"
          type="range"
          min="0"
          max="100"
          value={data.technicalLiteracy}
          onChange={(e) =>
            onChange('technicalLiteracy', Number(e.target.value))
          }
          className="h-2"
        />
        <div className="mt-1 text-sm font-medium text-blue-600">
          {data.technicalLiteracy}
        </div>
      </div>

      <div>
        <Label htmlFor="online" className="text-base">
          Online Activity Frequency (0-100)
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          How frequently you use the internet and online services
        </p>
        <Input
          id="online"
          type="range"
          min="0"
          max="100"
          value={data.onlineActivityFrequency}
          onChange={(e) =>
            onChange('onlineActivityFrequency', Number(e.target.value))
          }
          className="h-2"
        />
        <div className="mt-1 text-sm font-medium text-blue-600">
          {data.onlineActivityFrequency}
        </div>
      </div>

      <div>
        <Label htmlFor="public" className="text-base">
          Public Personal Information (0-100)
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          How much personal info you share publicly (100 = very public)
        </p>
        <Input
          id="public"
          type="range"
          min="0"
          max="100"
          value={data.publicPersonalInfo}
          onChange={(e) =>
            onChange('publicPersonalInfo', Number(e.target.value))
          }
          className="h-2"
        />
        <div className="mt-1 text-sm font-medium text-blue-600">
          {data.publicPersonalInfo}
        </div>
      </div>

      <div>
        <Label htmlFor="password" className="text-base">
          Password Hygiene (0-100)
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          Quality of your password practices (100 = excellent habits)
        </p>
        <Input
          id="password"
          type="range"
          min="0"
          max="100"
          value={data.passwordHygiene}
          onChange={(e) => onChange('passwordHygiene', Number(e.target.value))}
          className="h-2"
        />
        <div className="mt-1 text-sm font-medium text-blue-600">
          {data.passwordHygiene}
        </div>
      </div>

      <div>
        <Label htmlFor="verification" className="text-base">
          Verification Habits (0-100)
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          How often you verify requests and check authenticity
        </p>
        <Input
          id="verification"
          type="range"
          min="0"
          max="100"
          value={data.verificationHabits}
          onChange={(e) =>
            onChange('verificationHabits', Number(e.target.value))
          }
          className="h-2"
        />
        <div className="mt-1 text-sm font-medium text-blue-600">
          {data.verificationHabits}
        </div>
      </div>

      <div>
        <Label htmlFor="incidents" className="text-base">
          Past Scam Incidents (0-5)
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          Number of times you&apos;ve fallen for scams
        </p>
        <Input
          id="incidents"
          type="number"
          min="0"
          max="5"
          value={data.pastIncidents}
          onChange={(e) => onChange('pastIncidents', Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Summary section */}
      <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">Safety Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Use unique passwords for each account</li>
          <li>Enable two-factor authentication</li>
          <li>Be skeptical of unsolicited requests</li>
          <li>Verify before clicking links or providing info</li>
          <li>Keep software and antivirus updated</li>
        </ul>
      </div>
    </div>
  );
}
