'use client';
import { useState } from 'react';

export default function Home() {
  const [score, setScore] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const scoreRes = await fetch('https://eco-track-backend-fmi7.vercel.app/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalEmissions: 150.5, totalSpending: 50000 })
      });
      const scoreData = await scoreRes.json();
      setScore(scoreData.sustainabilityScore);

      const recRes = await fetch('https://eco-track-backend-fmi7.vercel.app/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ utilitySpending: 2500, fuelSpending: 1200, avgIntensity: 0.003 })
      });
      const recData = await recRes.json();
      setRecommendations(recData.recommendations || []);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex">
      <aside className="w-64 border-r border-gray-800 p-6">
        <h2 className="text-green-500 font-bold text-xl mb-10 tracking-widest uppercase">Eco-Track</h2>
        <nav className="space-y-4 text-gray-400">
          <div className="text-white bg-gray-800/50 p-2 rounded-lg border border-gray-700">Dashboard</div>
          <div className="hover:text-white cursor-pointer px-2 transition">Analytics</div>
        </nav>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-semibold">Sustainability Overview</h1>
          <button onClick={fetchDashboardData} className="bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700 transition-all font-medium">
            Update Analytics
          </button>
        </header>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-[#161B22] p-6 rounded-2xl border border-gray-800 shadow-xl">
            <h3 className="text-gray-400 mb-4 text-xs uppercase tracking-wider font-bold">Sustainability Score</h3>
            <div className="text-6xl font-black text-green-400">{score}</div>
          </div>
          <div className="bg-[#161B22] p-6 rounded-2xl border border-gray-800 col-span-2">
            <h3 className="text-gray-400 mb-4 text-xs uppercase tracking-wider font-bold">Carbon Analysis</h3>
            <div className="h-24 bg-gray-800/30 rounded-xl flex items-center justify-center text-gray-500 italic">Processing Data...</div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-6">Partner Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec, i) => (
              <div key={i} className="bg-gray-800/20 border border-green-900/30 p-4 rounded-xl hover:border-green-500/50 transition-all">
                <div className="text-green-500 text-[10px] font-bold mb-2 uppercase">Action Required</div>
                <p className="text-sm text-gray-300">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}