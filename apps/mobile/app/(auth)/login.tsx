import { View, Text, Pressable } from 'react-native';
import { useAuth } from '../../hooks/use-auth';
import { Redirect } from 'expo-router';

export default function LoginScreen() {
  const { user, loading, signIn } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0a0f' }}>
        <Text style={{ color: '#ff6b6b', fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }

  if (user) return <Redirect href="/(tabs)" />;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0a0f', padding: 24 }}>
      <Text style={{ color: '#ff6b6b', fontSize: 32, fontWeight: 'bold', marginBottom: 8 }}>FitForge</Text>
      <Text style={{ color: '#a0a0b0', fontSize: 14, marginBottom: 40 }}>32-Day Body Transformation</Text>
      <Pressable
        onPress={signIn}
        style={{ backgroundColor: '#ff6b6b', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 }}
      >
        <Text style={{ color: '#ffffff', fontWeight: '600', fontSize: 16 }}>Sign in with Google</Text>
      </Pressable>
    </View>
  );
}
