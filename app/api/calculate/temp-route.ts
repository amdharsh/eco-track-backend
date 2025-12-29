import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount, mccFactor, countryMultiplier } = await request.json();

    // Logic: Amount * Base Factor * Multiplier
    const totalEmission = amount * mccFactor * countryMultiplier;

    return NextResponse.json({ 
      totalEmission: totalEmission.toFixed(4),
      unit: "kgCO2e" 
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}