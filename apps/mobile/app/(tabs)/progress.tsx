import { View, Text, ScrollView } from 'react-native';

export default function ProgressScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0a0a0f' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>Progress</Text>
      <View style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginTop: 16 }}>
        <Text style={{ color: '#a0a0b0', fontSize: 14 }}>Weight chart and measurements sync from web.</Text>
        <Text style={{ color: '#6b6b7b', fontSize: 12, marginTop: 8 }}>Start weight: 68.8 kg</Text>
        <Text style={{ color: '#6b6b7b', fontSize: 12 }}>Target: 62.8 kg</Text>
        <Text style={{ color: '#4ecdc4', fontSize: 12, marginTop: 8 }}>Weigh in every Monday morning</Text>
      </View>
    </ScrollView>
  );
}
