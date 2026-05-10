import { View, Text, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';

export default function HealthScreen() {
  const [glasses, setGlasses] = useState(0);
  const [supplements, setSupplements] = useState({ creatine: false, vitaminD: false, magnesium: false });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0a0a0f' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>Health</Text>

      <View style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginTop: 16 }}>
        <Text style={{ color: '#6b6b7b', fontSize: 10, textTransform: 'uppercase', marginBottom: 8 }}>Hydration ({glasses}/14)</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {Array.from({ length: 14 }, (_, i) => (
            <Pressable key={i} onPress={() => setGlasses(i + 1)}
              style={{ width: 28, height: 28, borderRadius: 6, justifyContent: 'center', alignItems: 'center',
                backgroundColor: i < glasses ? 'rgba(78,205,196,0.2)' : '#252540' }}>
              <Text style={{ color: i < glasses ? '#4ecdc4' : '#6b6b7b', fontSize: 12 }}>
                {i < glasses ? '●' : '○'}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginTop: 12 }}>
        <Text style={{ color: '#6b6b7b', fontSize: 10, textTransform: 'uppercase', marginBottom: 8 }}>Supplements</Text>
        {(['creatine', 'vitaminD', 'magnesium'] as const).map(key => (
          <Pressable key={key} onPress={() => setSupplements(p => ({ ...p, [key]: !p[key] }))}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }}>
            <Text style={{ color: '#a0a0b0', fontSize: 13, textTransform: 'capitalize' }}>{key}</Text>
            <View style={{ width: 24, height: 24, borderRadius: 6, borderWidth: 1,
              borderColor: supplements[key] ? '#6bcf7f' : 'rgba(255,255,255,0.2)',
              backgroundColor: supplements[key] ? 'rgba(107,207,127,0.2)' : 'transparent',
              justifyContent: 'center', alignItems: 'center' }}>
              {supplements[key] && <Text style={{ color: '#6bcf7f', fontSize: 12 }}>✓</Text>}
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
