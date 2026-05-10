'use client';

interface SessionHeatmapProps {
  sessionDates: Record<string, number>; // date -> activity count
}

export function SessionHeatmap({ sessionDates }: SessionHeatmapProps) {
  // Generate 35 days from May 10 to June 14
  const startDate = new Date('2025-05-10');
  const days: string[] = [];
  for (let i = 0; i < 36; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    days.push(d.toISOString().split('T')[0]);
  }

  const getIntensity = (count: number): string => {
    if (count === 0) return 'bg-bg-elevated';
    if (count === 1) return 'bg-accent-teal/30';
    if (count === 2) return 'bg-accent-teal/60';
    return 'bg-accent-teal';
  };

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-bg-card rounded-xl p-4 border border-white/5">
      <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Activity Heatmap</h3>
      <div className="grid grid-cols-7 gap-1">
        {dayLabels.map((label) => (
          <div key={label} className="text-[9px] text-text-muted text-center mb-1">{label}</div>
        ))}
        {/* Offset for first day (May 10 2025 is Saturday = index 6) */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((date) => {
          const count = sessionDates[date] || 0;
          return (
            <div
              key={date}
              className={`aspect-square rounded-sm ${getIntensity(count)}`}
              title={`${date}: ${count} activities`}
            />
          );
        })}
      </div>
      <div className="flex items-center gap-2 mt-3 text-[9px] text-text-muted">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-bg-elevated" />
        <div className="w-3 h-3 rounded-sm bg-accent-teal/30" />
        <div className="w-3 h-3 rounded-sm bg-accent-teal/60" />
        <div className="w-3 h-3 rounded-sm bg-accent-teal" />
        <span>More</span>
      </div>
    </div>
  );
}
