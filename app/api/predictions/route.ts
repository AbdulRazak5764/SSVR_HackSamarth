import { NextRequest, NextResponse } from 'next/server';
import { Prediction } from '@/lib/types';

// In-memory storage for predictions (would be a database in production)
const predictionsStore: Map<string, Prediction[]> = new Map();

/**
 * GET /api/predictions?userId=user-1
 * Retrieve all predictions for a user
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId query parameter is required' },
        { status: 400 }
      );
    }

    const predictions = predictionsStore.get(userId) || [];

    return NextResponse.json({
      success: true,
      count: predictions.length,
      predictions: predictions.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    });
  } catch (error) {
    console.error('Get predictions API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/predictions
 * Save a new prediction
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, prediction } = body;

    if (!userId || !prediction) {
      return NextResponse.json(
        { error: 'userId and prediction are required' },
        { status: 400 }
      );
    }

    // Get existing predictions or create new array
    const userPredictions = predictionsStore.get(userId) || [];
    userPredictions.push(prediction);

    // Keep only last 100 predictions
    if (userPredictions.length > 100) {
      userPredictions.shift();
    }

    predictionsStore.set(userId, userPredictions);

    return NextResponse.json({
      success: true,
      message: 'Prediction saved',
      prediction,
    });
  } catch (error) {
    console.error('Save prediction API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
