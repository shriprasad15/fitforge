import { View, Text, ScrollView } from 'react-native';
import { hiitProtocols, getCurrentWeek } from '@fitforge/shared';

export default function HIITScreen() {
  const week = getCurrentWeek();
  const track = hiitProtocols.trackSprints;
  const circuit = hiitProtocols.seatingCircuit;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0a0a0f' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>HIIT Timer</Text>
      <Text style={{ color: '#6b6b7b', fontSize: 12, marginTop: 4 }}>Monday only · Manohar C Watsa Stadium</Text>

      <View style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginTop: 16 }}>
        <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '500' }}>Option A: Track Sprints</Text>
        <Text style={{ color: '#6b6b7b', fontSize: 11, marginTop: 4 }}>Sprint 30s / Walk 90s</Text>
        <Text style={{ color: '#4ecdc4', fontSize: 12, marginTop: 8 }}>Week {week}: {track.roundsPerWeek[week]} rounds</Text>
      </View>

      <View style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginTop: 8 }}>
        <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '500' }}>Option B: Seating Circuit</Text>
        <Text style={{ color: '#6b6b7b', fontSize: 11, marginTop: 4 }}>Jump Squats + Burpees + Mountain Climbers + High Knees</Text>
        <Text style={{ color: '#4ecdc4', fontSize: 12, marginTop: 8 }}>Week {week}: {circuit.roundsPerWeek[week]} rounds</Text>
      </View>

      <View style={{ backgroundColor: '#252540', borderRadius: 12, padding: 20, marginTop: 24, alignItems: 'center' }}>
        <Text style={{ color: '#6b6b7b', fontSize: 10, textTransform: 'uppercase' }}>Timer</Text>
        <Text style={{ color: '#ffffff', fontSize: 48, fontWeight: 'bold', marginTop: 8 }}>0:00</Text>
        <Text style={{ color: '#6b6b7b', fontSize: 12, marginTop: 4 }}>Full timer available on web</Text>
      </View>
    </ScrollView>
  );
}
