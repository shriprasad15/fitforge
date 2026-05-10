'use client';

import { useState } from 'react';
import { ScheduleTimeline } from '@/components/schedule-timeline';
import { scheduleTemplates, dayToTemplate, getDayOfWeek, DayOfWeek } from '@fitforge/shared';

const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const dayLabels: Record<DayOfWeek, string> = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
  sunday: 'Sun',
};

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(getDayOfWeek());
  const templateKey = dayToTemplate[selectedDay];
  const schedule = scheduleTemplates[templateKey];

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="font-heading text-2xl font-bold">Daily Schedule</h1>

      {/* Day Selector */}
      <div className="flex gap-1 bg-bg-elevated rounded-lg p-1 overflow-x-auto">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`flex-1 text-xs font-medium py-2 px-2 rounded-md transition-colors whitespace-nowrap ${
              selectedDay === d
                ? 'bg-accent-coral text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {dayLabels[d]}
          </button>
        ))}
      </div>

      {/* Schedule Type Badge */}
      <div className="bg-bg-card rounded-xl p-3 border border-white/5 flex items-center justify-between">
        <p className="text-sm text-text-primary font-medium capitalize">{schedule.dayType.replace(/([A-Z])/g, ' $1')}</p>
        <span className="text-xs text-text-muted">{schedule.blocks.length} blocks</span>
      </div>

      {/* Timeline */}
      <ScheduleTimeline blocks={schedule.blocks} />
    </div>
  );
}
