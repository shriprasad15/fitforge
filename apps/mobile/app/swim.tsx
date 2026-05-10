import { View, Text, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import { swimPlan, getCurrentWeek } from '@fitforge/shared';

export default function SwimScreen() {
  const [laps, setLaps] = useState(0);
  const week = getCurrentWeek();
  const plan = swimPlan[Math.min(week - 1, swimPlan.length - 1)];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0a0a0f' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>Swim Plan</Text>
      <Text style={{ color: '#6b6b7b', fontSize: 12, marginTop: 4 }}>Week {week} · Target: {plan.totalLaps} laps</Text>

      <View style={{ backgroundColor: 'rgba(78,205,196,0.05)', borderRadius: 12, padding: 16, marginTop: 16, borderWidth: 1, borderColor: 'rgba(78,205,196,0.2)' }}>
        <Text style={{ color: '#4ecdc4', fontSize: 10, textTransform: 'uppercase', marginBottom: 4 }}>Breath Control Tip</Text>
        <Text style={{ color: '#a0a0b0', fontSize: 12 }}>{plan.breathControlTip}</Text>
      </View>

      <View style={{ alignItems: 'center', marginTop: 24 }}>
        <Text style={{ color: '#6b6b7b', fontSize: 10, textTransform: 'uppercase' }}>Laps</Text>
        <Text style={{ color: '#4ecdc4', fontSize: 48, fontWeight: 'bold' }}>{laps}</Text>
        <View style={{ flexDirection: 'row', gap: 16, marginTop: 12 }}>
          <Pressable onPress={() => setLaps(l => Math.max(0, l - 1))}
            style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#252540', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#a0a0b0', fontSize: 20 }}>-</Text>
          </Pressable>
          <Pressable onPress={() => setLaps(l => l + 1)}
            style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#4ecdc4', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>+</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
