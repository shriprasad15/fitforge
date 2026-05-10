import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '../../hooks/use-auth';
import {
  getDaysToPlanEnd, getDaysToConvocation, getCurrentPhase, getPhaseLabel,
  getDayOfWeek, getGymDay, isSwimDay, isHIITDay, gymPlan,
  DAILY_CALORIE_TARGET, DAILY_PROTEIN_TARGET, motivationalQuotes,
} from '@fitforge/shared';

export default function DashboardScreen() {
  const { user } = useAuth();
  const today = getDayOfWeek();
  const gymDay = getGymDay();
  const phase = getCurrentPhase();
  const todayPlan = gymDay ? gymPlan[phase].days[gymDay] : null;
  const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const quote = motivationalQuotes[dayOfYear % motivationalQuotes.length];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0a0a0f' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>
        Hey, {user?.displayName?.split(' ')[0] || 'there'}
      </Text>
      <Text style={{ color: '#6b6b7b', fontSize: 12, textTransform: 'capitalize', marginTop: 4 }}>{today}</Text>

      <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
        <View style={{ flex: 1, backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16 }}>
          <Text style={{ color: '#6b6b7b', fontSize: 10, textTransform: 'uppercase' }}>Plan Ends</Text>
          <Text style={{ color: '#ff6b6b', fontSize: 28, fontWeight: 'bold' }}>{getDaysToPlanEnd()}</Text>
          <Text style={{ color: '#a0a0b0', fontSize: 10 }}>days left</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16 }}>
          <Text style={{ color: '#6b6b7b', fontSize: 10, textTransform: 'uppercase' }}>Convocation</Text>
          <Text style={{ color: '#4ecdc4', fontSize: 28, fontWeight: 'bold' }}>{getDaysToConvocation()}</Text>
          <Text style={{ color: '#a0a0b0', fontSize: 10 }}>days to June 14</Text>
        </View>
      </View>

      <View style={{ marginTop: 12, backgroundColor: '#1a1a2e', borderRadius: 8, padding: 8, alignSelf: 'flex-start' }}>
        <Text style={{ color: '#4ecdc4', fontSize: 11 }}>{getPhaseLabel(phase)}</Text>
      </View>

      <View style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginTop: 16 }}>
        <Text style={{ color: '#6b6b7b', fontSize: 10, textTransform: 'uppercase', marginBottom: 8 }}>Today&apos;s Training</Text>
        {todayPlan ? (
          <>
            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600' }}>{todayPlan.name}</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
              <View style={{ backgroundColor: 'rgba(59,130,246,0.1)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 }}>
                <Text style={{ color: '#60a5fa', fontSize: 10 }}>Gym</Text>
              </View>
              {isSwimDay() && (
                <View style={{ backgroundColor: 'rgba(78,205,196,0.1)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 }}>
                  <Text style={{ color: '#4ecdc4', fontSize: 10 }}>Swim 6-7 PM</Text>
                </View>
              )}
              {isHIITDay() && (
                <View style={{ backgroundColor: 'rgba(255,107,107,0.1)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 }}>
                  <Text style={{ color: '#ff6b6b', fontSize: 10 }}>HIIT</Text>
                </View>
              )}
            </View>
          </>
        ) : (
          <Text style={{ color: '#a0a0b0', fontSize: 14 }}>
            {today === 'saturday' ? 'Active Recovery + Swim' : 'Full Rest Day'}
          </Text>
        )}
      </View>

      <View style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginTop: 12 }}>
        <Text style={{ color: '#6b6b7b', fontSize: 10, textTransform: 'uppercase', marginBottom: 8 }}>Nutrition Target</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ color: '#ff6b6b', fontSize: 22, fontWeight: 'bold' }}>{DAILY_CALORIE_TARGET}</Text>
            <Text style={{ color: '#6b6b7b', fontSize: 10 }}>kcal target</Text>
          </View>
          <View>
            <Text style={{ color: '#4ecdc4', fontSize: 22, fontWeight: 'bold' }}>{DAILY_PROTEIN_TARGET}g</Text>
            <Text style={{ color: '#6b6b7b', fontSize: 10 }}>protein target</Text>
          </View>
        </View>
      </View>

      <View style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginTop: 12 }}>
        <Text style={{ color: '#a0a0b0', fontSize: 12, fontStyle: 'italic' }}>&ldquo;{quote}&rdquo;</Text>
      </View>
    </ScrollView>
  );
}
