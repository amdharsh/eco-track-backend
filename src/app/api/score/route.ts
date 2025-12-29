import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { totalEmissions, totalSpending } = await request.json();
    
    // Algorithm: Compare avgIntensity against 0.0015 benchmark
    const avgIntensity = totalEmissions / totalSpending;
    let score = 100 - (avgIntensity / 0.0015) * 50;

    // Logic: Clamp score between 0 and 100
    score = Math.max(0, Math.min(100, score));

    return NextResponse.json({ 
      sustainabilityScore: score.toFixed(2),
      intensity: avgIntensity.toFixed(5)
    });
  } catch (error) {
      return NextResponse.json({ sustainabilityScore: "0.00", error: "Calculation failed" }, { status: 400 });
    }


} 
