'use client';

import { TimeBlock, BlockCategory } from '@fitforge/shared';

interface ScheduleTimelineProps {
  blocks: TimeBlock[];
}

const categoryColors: Record<BlockCategory, string> = {
  gym: 'bg-accent-coral/20 border-accent-coral/40 text-accent-coral',
  swim: 'bg-accent-teal/20 border-accent-teal/40 text-accent-teal',
  hiit: 'bg-accent-gold/20 border-accent-gold/40 text-accent-gold',
  work: 'bg-blue-500/20 border-blue-500/40 text-blue-400',
  meal: 'bg-success/20 border-success/40 text-success',
  rest: 'bg-purple-500/20 border-purple-500/40 text-purple-400',
  commute: 'bg-text-muted/20 border-text-muted/40 text-text-muted',
  sleep: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400',
};

export function ScheduleTimeline({ blocks }: ScheduleTimelineProps) {
  return (
    <div className="space-y-1">
      {blocks.map((block) => (
        <div
          key={block.id}
          className={`rounded-lg p-3 border-l-4 ${categoryColors[block.category]}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{block.label}</p>
            <p className="text-xs opacity-70">{block.startTime} - {block.endTime}</p>
          </div>
          {block.notes && (
            <p className="text-[10px] opacity-60 mt-0.5">{block.notes}</p>
          )}
        </div>
      ))}
    </div>
  );
}
