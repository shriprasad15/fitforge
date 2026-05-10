import { View, Text, Pressable, ScrollView } from 'react-native';
import { Link } from 'expo-router';

export default function MoreScreen() {
  const items = [
    { href: '/swim' as const, label: 'Swim Plan', desc: 'Lap tracking + breath tips' },
    { href: '/hiit' as const, label: 'HIIT Timer', desc: 'Monday interval timer' },
    { href: '/schedule' as const, label: 'Schedule', desc: 'Daily timeline' },
    { href: '/health' as const, label: 'Health', desc: 'Sleep, hydration, recovery' },
    { href: '/recipes' as const, label: 'Recipes', desc: '8 quick protein meals' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0a0a0f' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>More</Text>
      {items.map(item => (
        <Link key={item.href} href={item.href} asChild>
          <Pressable style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginBottom: 8 }}>
            <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '500' }}>{item.label}</Text>
            <Text style={{ color: '#6b6b7b', fontSize: 11, marginTop: 2 }}>{item.desc}</Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}
