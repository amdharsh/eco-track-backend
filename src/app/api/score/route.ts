import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { totalEmissions, totalSpending } = await request.json();

    // 1. Calculate Intensity against your 0.0015 benchmark
    const avgIntensity = totalEmissions / totalSpending;
    
    // 2. Apply the Slide 8 Scoring Formula
    let scoreValue = 100 - (avgIntensity / 0.0015) * 50;

    // 3. Clamp score between 0 and 100
    scoreValue = Math.max(0, Math.min(100, scoreValue));

    return NextResponse.json({ 
      sustainabilityScore: scoreValue.toFixed(2),
      intensity: avgIntensity.toFixed(5)
    });

  } catch (error) {
    // Graceful error handling for the live demo
    return NextResponse.json({ 
      sustainabilityScore: "0.00", 
      error: "Invalid input data" 
    }, { status: 400 });
  }
}