import { View, Text, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import { gymPlan, getCurrentPhase, getGymDay, Phase, GymDay } from '@fitforge/shared';

export default function GymScreen() {
  const [selectedPhase, setSelectedPhase] = useState<Phase>(getCurrentPhase());
  const [selectedDay, setSelectedDay] = useState<GymDay>(getGymDay() || 'monday');
  const phase = gymPlan[selectedPhase];
  const dayPlan = phase.days[selectedDay];

  const phases: { key: Phase; label: string }[] = [
    { key: 'phase1', label: 'Wk 1-2' },
    { key: 'phase2', label: 'Wk 3-4' },
    { key: 'phase3', label: 'Final' },
  ];
  const days: { key: GymDay; label: string }[] = [
    { key: 'monday', label: 'Mon' }, { key: 'tuesday', label: 'Tue' },
    { key: 'wednesday', label: 'Wed' }, { key: 'thursday', label: 'Thu' }, { key: 'friday', label: 'Fri' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0a0a0f' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>Gym Plan</Text>

      <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
        {phases.map(p => (
          <Pressable key={p.key} onPress={() => setSelectedPhase(p.key)}
            style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8,
              backgroundColor: selectedPhase === p.key ? '#ff6b6b' : '#1a1a2e' }}>
            <Text style={{ color: selectedPhase === p.key ? '#fff' : '#6b6b7b', fontSize: 12 }}>{p.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={{ flexDirection: 'row', gap: 4, marginTop: 8 }}>
        {days.map(d => (
          <Pressable key={d.key} onPress={() => setSelectedDay(d.key)}
            style={{ flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center',
              backgroundColor: selectedDay === d.key ? 'rgba(78,205,196,0.1)' : '#1a1a2e',
              borderWidth: selectedDay === d.key ? 1 : 0, borderColor: 'rgba(78,205,196,0.3)' }}>
            <Text style={{ color: selectedDay === d.key ? '#4ecdc4' : '#6b6b7b', fontSize: 11 }}>{d.label}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600', marginTop: 16 }}>{dayPlan.name}</Text>
      {dayPlan.postGym && <Text style={{ color: '#4ecdc4', fontSize: 11, marginTop: 4 }}>After: {dayPlan.postGym}</Text>}

      {dayPlan.exercises.map((ex, i) => (
        <View key={ex.id} style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 14, marginTop: 8,
          borderWidth: ex.isPriority ? 1 : 0, borderColor: 'rgba(255,107,107,0.3)' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={{ color: '#6b6b7b', fontSize: 11 }}>{i + 1}.</Text>
            <Text style={{ color: '#ffffff', fontSize: 13, fontWeight: '500', flex: 1 }}>{ex.name}</Text>
            {ex.isPriority && <Text style={{ color: '#ff6b6b', fontSize: 9, backgroundColor: 'rgba(255,107,107,0.1)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>Priority</Text>}
          </View>
          <Text style={{ color: '#6b6b7b', fontSize: 11, marginTop: 4 }}>
            {ex.sets} × {ex.reps} · {ex.startWeight} · Rest {ex.rest}
          </Text>
          {ex.cue && <Text style={{ color: '#4ecdc4', fontSize: 10, marginTop: 4, fontStyle: 'italic' }}>{ex.cue}</Text>}
        </View>
      ))}
    </ScrollView>
  );
}
