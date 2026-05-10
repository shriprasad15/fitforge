'use client';

import { useState } from 'react';
import { useProgress } from '@/hooks/use-progress';
import { WeightChart } from '@/components/weight-chart';
import { SessionHeatmap } from '@/components/session-heatmap';
import { WeighIn, getToday } from '@fitforge/shared';

export default function ProgressPage() {
  const { weighIns, addWeighIn } = useProgress();
  const [showForm, setShowForm] = useState(false);
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [arm, setArm] = useState('');
  const [chest, setChest] = useState('');
  const [thigh, setThigh] = useState('');
  const [pushups, setPushups] = useState('');
  const [energyLevel, setEnergyLevel] = useState(3);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight) return;
    const entry: WeighIn = {
      date: getToday(),
      weight: parseFloat(weight),
      waistCm: parseFloat(waist) || 0,
      armCm: parseFloat(arm) || 0,
    };
    await addWeighIn(entry);
    setShowForm(false);
    setWeight('');
    setWaist('');
    setArm('');
    setChest('');
    setThigh('');
    setPushups('');
  };

  // Build mock session data from weigh-in dates for heatmap
  const sessionDates: Record<string, number> = {};
  weighIns.forEach((w) => {
    sessionDates[w.date] = (sessionDates[w.date] || 0) + 1;
  });

  const startWeight = 70;
  const targetWeight = 64;
  const currentWeight = weighIns.length > 0 ? weighIns[weighIns.length - 1].weight : startWeight;
  const progressPercent = Math.min(100, Math.max(0, ((startWeight - currentWeight) / (startWeight - targetWeight)) * 100));

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Progress</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-xs bg-accent-coral hover:bg-accent-coral/90 text-white py-2 px-4 rounded-lg transition-colors"
        >
          + Log Entry
        </button>
      </div>

      {/* Goal progress bar */}
      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-text-muted">Goal: {startWeight}kg → {targetWeight}kg</span>
          <span className="text-xs font-medium text-accent-teal">{progressPercent.toFixed(0)}%</span>
        </div>
        <div className="w-full h-2 bg-bg-elevated rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-coral to-accent-teal rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-text-muted mt-1">
          Current: {currentWeight}kg | To go: {Math.max(0, currentWeight - targetWeight).toFixed(1)}kg
        </p>
      </div>

      {/* Log Entry Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-bg-card rounded-xl p-4 border border-white/5 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-text-muted block mb-1">Weight (kg)*</label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary"
                placeholder="65.0"
                required
              />
            </div>
            <div>
              <label className="text-xs text-text-muted block mb-1">Waist (cm)</label>
              <input
                type="number"
                step="0.1"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary"
                placeholder="78"
              />
            </div>
            <div>
              <label className="text-xs text-text-muted block mb-1">Arm (cm)</label>
              <input
                type="number"
                step="0.1"
                value={arm}
                onChange={(e) => setArm(e.target.value)}
                className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary"
                placeholder="33"
              />
            </div>
            <div>
              <label className="text-xs text-text-muted block mb-1">Chest (cm)</label>
              <input
                type="number"
                step="0.1"
                value={chest}
                onChange={(e) => setChest(e.target.value)}
                className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary"
                placeholder="90"
              />
            </div>
            <div>
              <label className="text-xs text-text-muted block mb-1">Thigh (cm)</label>
              <input
                type="number"
                step="0.1"
                value={thigh}
                onChange={(e) => setThigh(e.target.value)}
                className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary"
                placeholder="52"
              />
            </div>
            <div>
              <label className="text-xs text-text-muted block mb-1">Max Push-ups</label>
              <input
                type="number"
                value={pushups}
                onChange={(e) => setPushups(e.target.value)}
                className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary"
                placeholder="20"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-text-muted block mb-1">Energy Level</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setEnergyLevel(level)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    energyLevel >= level
                      ? 'bg-accent-gold/20 text-accent-gold border border-accent-gold/30'
                      : 'bg-bg-elevated text-text-muted border border-white/5'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-accent-teal hover:bg-accent-teal/90 text-bg-primary font-medium py-2 rounded-lg transition-colors text-sm"
          >
            Save Entry
          </button>
        </form>
      )}

      {/* Weight Chart */}
      <WeightChart weighIns={weighIns} />

      {/* Session Heatmap */}
      <SessionHeatmap sessionDates={sessionDates} />

      {/* Latest entries */}
      {weighIns.length > 0 && (
        <div className="bg-bg-card rounded-xl p-4 border border-white/5">
          <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">Recent Entries</h3>
          <div className="space-y-2">
            {weighIns.slice(-5).reverse().map((w) => (
              <div key={w.date} className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">{w.date}</span>
                <div className="flex gap-4">
                  <span className="text-text-primary font-medium">{w.weight} kg</span>
                  {w.waistCm > 0 && <span className="text-text-muted">W: {w.waistCm}cm</span>}
                  {w.armCm > 0 && <span className="text-text-muted">A: {w.armCm}cm</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
