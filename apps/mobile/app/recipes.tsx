import { View, Text, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import { recipes } from '@fitforge/shared';

export default function RecipesScreen() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0a0a0f' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>Recipes</Text>
      <Text style={{ color: '#6b6b7b', fontSize: 12, marginTop: 4 }}>Quick protein-rich meals</Text>

      {recipes.map(recipe => (
        <Pressable key={recipe.id} onPress={() => setExpanded(expanded === recipe.id ? null : recipe.id)}
          style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 14, marginTop: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#ffffff', fontSize: 13, fontWeight: '500' }}>{recipe.name}</Text>
              <Text style={{ color: '#6b6b7b', fontSize: 10, marginTop: 2 }}>{recipe.cuisine} · {recipe.cookTime} min</Text>
            </View>
            <View>
              <Text style={{ color: '#ff6b6b', fontSize: 10 }}>{recipe.calories} kcal</Text>
              <Text style={{ color: '#4ecdc4', fontSize: 10 }}>{recipe.protein}g protein</Text>
            </View>
          </View>
          {expanded === recipe.id && (
            <View style={{ marginTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: 12 }}>
              <Text style={{ color: '#6b6b7b', fontSize: 10, marginBottom: 4 }}>Ingredients:</Text>
              {recipe.ingredients.map((ing, i) => (
                <Text key={i} style={{ color: '#a0a0b0', fontSize: 10, marginTop: 1 }}>· {ing}</Text>
              ))}
              <Text style={{ color: '#6b6b7b', fontSize: 10, marginTop: 8, marginBottom: 4 }}>Steps:</Text>
              {recipe.steps.map((step, i) => (
                <Text key={i} style={{ color: '#a0a0b0', fontSize: 10, marginTop: 2 }}>{i + 1}. {step}</Text>
              ))}
            </View>
          )}
        </Pressable>
      ))}
    </ScrollView>
  );
}
