import { View, Text, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import { mealPlan, getDayOfWeek, DayOfWeek, MealTime } from '@fitforge/shared';

export default function MealsScreen() {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(getDayOfWeek());
  const dayPlan = mealPlan[selectedDay];
  const mealTimes: MealTime[] = ['breakfast', 'midMorning', 'lunch', 'preWorkout', 'postWorkout', 'dinner'];
  const days: { key: DayOfWeek; label: string }[] = [
    { key: 'monday', label: 'M' }, { key: 'tuesday', label: 'T' }, { key: 'wednesday', label: 'W' },
    { key: 'thursday', label: 'T' }, { key: 'friday', label: 'F' }, { key: 'saturday', label: 'S' }, { key: 'sunday', label: 'S' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0a0a0f' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>Meals</Text>
      <View style={{ flexDirection: 'row', gap: 4, marginTop: 12 }}>
        {days.map(d => (
          <Pressable key={d.key} onPress={() => setSelectedDay(d.key)}
            style={{ flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center',
              backgroundColor: selectedDay === d.key ? '#ff6b6b' : '#1a1a2e' }}>
            <Text style={{ color: selectedDay === d.key ? '#fff' : '#6b6b7b', fontSize: 11 }}>{d.label}</Text>
          </Pressable>
        ))}
      </View>
      {mealTimes.map(mt => (
        <View key={mt} style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 14, marginTop: 8 }}>
          <Text style={{ color: '#6b6b7b', fontSize: 10, textTransform: 'capitalize' }}>{mt.replace(/([A-Z])/g, ' $1')}</Text>
          <Text style={{ color: '#ffffff', fontSize: 13, fontWeight: '500', marginTop: 2 }}>{dayPlan[mt].name}</Text>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 4 }}>
            <Text style={{ color: '#ff6b6b', fontSize: 10 }}>{dayPlan[mt].calories} kcal</Text>
            <Text style={{ color: '#4ecdc4', fontSize: 10 }}>{dayPlan[mt].protein}g protein</Text>
          </View>
          <View style={{ marginTop: 6 }}>
            {dayPlan[mt].items.map((item, i) => (
              <Text key={i} style={{ color: '#6b6b7b', fontSize: 10, marginTop: 1 }}>· {item}</Text>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
