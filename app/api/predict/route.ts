import { NextRequest, NextResponse } from 'next/server';
import { RiskAssessmentInputSchema } from '@/lib/schemas';
import { predictRisks } from '@/lib/predictions';

/**
 * POST /api/predict
 * Calculate risk scores and explanations for given input factors
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = RiskAssessmentInputSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Invalid input',
          details: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    // Get predictions
    const { scores, explanation } = predictRisks(result.data);

    return NextResponse.json({
      success: true,
      scores,
      explanation,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Prediction API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
