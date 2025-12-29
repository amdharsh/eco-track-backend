import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { utilitySpending, fuelSpending, avgIntensity } = await request.json();
  let recommendations = [];

  // Logic: Utility (MCC 4900) > $2,000
  if (utilitySpending > 2000) {
    recommendations.push("Energy: Consider Solar/renewable energy partners.");
  }
  // Logic: Fuel > $1,000
  if (fuelSpending > 1000) {
    recommendations.push("Transport: Look into EV fleet leasing partners.");
  }
  // Logic: Intensity > 0.002
  if (avgIntensity > 0.002) {
    recommendations.push("General: Join Carbon offset programs.");
  }

  return NextResponse.json({ recommendations });
}