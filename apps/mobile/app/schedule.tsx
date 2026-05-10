import { View, Text, ScrollView } from 'react-native';
import { getDayOfWeek, dayToTemplate, scheduleTemplates } from '@fitforge/shared';

const categoryColors: Record<string, string> = {
  gym: '#3b82f6', swim: '#4ecdc4', hiit: '#ff6b6b', work: '#6b7280',
  meal: '#f59e0b', rest: '#22c55e', commute: '#a855f7', sleep: '#6366f1',
};

export default function ScheduleScreen() {
  const today = getDayOfWeek();
  const templateKey = dayToTemplate[today];
  const schedule = scheduleTemplates[templateKey];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0a0a0f' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>Schedule</Text>
      <Text style={{ color: '#6b6b7b', fontSize: 12, textTransform: 'capitalize', marginTop: 4 }}>{today}</Text>

      {schedule.blocks.map(block => (
        <View key={block.id} style={{ flexDirection: 'row', marginTop: 6, borderLeftWidth: 3, borderLeftColor: categoryColors[block.category] || '#6b7280', paddingLeft: 12, paddingVertical: 6 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#ffffff', fontSize: 12 }}>{block.label}</Text>
          </View>
          <Text style={{ color: '#6b6b7b', fontSize: 10 }}>{block.startTime}-{block.endTime}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
