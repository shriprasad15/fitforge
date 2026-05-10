import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#1a1a2e', borderTopColor: 'rgba(255,255,255,0.05)' },
        tabBarActiveTintColor: '#ff6b6b',
        tabBarInactiveTintColor: '#6b6b7b',
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <Text style={{ color }}>◉</Text> }} />
      <Tabs.Screen name="gym" options={{ title: 'Gym', tabBarIcon: ({ color }) => <Text style={{ color }}>◎</Text> }} />
      <Tabs.Screen name="meals" options={{ title: 'Meals', tabBarIcon: ({ color }) => <Text style={{ color }}>◈</Text> }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress', tabBarIcon: ({ color }) => <Text style={{ color }}>◐</Text> }} />
      <Tabs.Screen name="more" options={{ title: 'More', tabBarIcon: ({ color }) => <Text style={{ color }}>◑</Text> }} />
    </Tabs>
  );
}
