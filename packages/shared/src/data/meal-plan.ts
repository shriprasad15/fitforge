import { DayMealPlan, DayOfWeek } from '../types';

const monday: DayMealPlan = {
  breakfast: {
    name: 'Moong Dal Cheela',
    calories: 380,
    protein: 28,
    items: [
      '2 moong dal cheela (minimal oil)',
      'Mint-coriander chutney',
      '1 cup low-fat curd',
      'Black coffee (no sugar)',
    ],
    source: 'homeCooking',
  },
  midMorning: {
    name: 'Coconut Water + Almonds',
    calories: 150,
    protein: 5,
    items: ['1 fresh coconut water', '10 almonds (soaked overnight)'],
    source: 'campusEatery',
  },
  lunch: {
    name: 'Rajma with Brown Rice',
    calories: 550,
    protein: 32,
    items: [
      'Rajma curry',
      '1 small cup brown rice or 2 multigrain rotis',
      'Mixed salad',
      '1 cup curd',
    ],
    source: 'homeCooking',
  },
  preWorkout: {
    name: 'Banana + Peanut Butter',
    calories: 200,
    protein: 6,
    items: ['1 banana', '1 tbsp peanut butter (unsalted)', '300 ml water'],
    source: 'homeCooking',
  },
  postWorkout: {
    name: 'Paneer Bhurji + Roti',
    calories: 280,
    protein: 22,
    items: [
      'Paneer bhurji (100g paneer, minimal oil)',
      '1 multigrain roti',
      '1 cup masala chaas',
    ],
    source: 'homeCooking',
  },
  dinner: {
    name: 'Dal Palak + Rotis',
    calories: 350,
    protein: 25,
    items: ['Dal palak (1.5 cups)', '2 whole wheat rotis', 'Roasted papad', 'Curd'],
    source: 'homeCooking',
  },
};

const tuesday: DayMealPlan = {
  breakfast: {
    name: 'Vegetable Oats Upma',
    calories: 360,
    protein: 26,
    items: [
      'Oats + onion + carrot + peas + mustard seeds',
      '50g paneer scramble',
      'Masala chai (no sugar)',
    ],
    source: 'homeCooking',
  },
  midMorning: {
    name: 'Peri Peri Makhana',
    calories: 120,
    protein: 4,
    items: ['Roasted makhana (30g, peri peri)', 'Green tea'],
    source: 'homeCooking',
  },
  lunch: {
    name: 'Chole with Rotis',
    calories: 520,
    protein: 30,
    items: [
      'Chole (chickpea curry)',
      '2 whole wheat rotis',
      'Pickled onion rings + green chutney',
      'Cucumber raita',
    ],
    source: 'homeCooking',
  },
  preWorkout: {
    name: 'Apple + Roasted Chana',
    calories: 180,
    protein: 8,
    items: ['1 apple', 'Roasted chana (30g, unsalted)'],
    source: 'homeCooking',
  },
  postWorkout: {
    name: 'Paneer Wrap',
    calories: 300,
    protein: 24,
    items: [
      'Whole wheat tortilla',
      'Pan-seared paneer cubes',
      'Shredded lettuce + tomato',
      'Hung curd dressing',
      '1 glass nimbu paani',
    ],
    source: 'homeCooking',
  },
  dinner: {
    name: 'Vegetable Soup + Roti',
    calories: 330,
    protein: 22,
    items: [
      'Mixed vegetable soup (tomato base) with tofu/paneer chunks',
      '1 multigrain roti',
      'Curd',
    ],
    source: 'homeCooking',
  },
};

const wednesday: DayMealPlan = {
  breakfast: {
    name: 'Besan Chilla',
    calories: 390,
    protein: 30,
    items: [
      'Gram flour pancake with onion + tomato + green chilli',
      'Mint coriander chutney',
      '1 cup low-fat curd',
      'Black coffee',
    ],
    source: 'homeCooking',
  },
  midMorning: {
    name: 'Peri Peri Corn + Coconut Water',
    calories: 160,
    protein: 4,
    items: ['Roasted corn with peri peri seasoning', 'Tender coconut water'],
    source: 'campusEatery',
  },
  lunch: {
    name: 'Dal Makhani + Baingan Bharta',
    calories: 560,
    protein: 34,
    items: [
      'Dal makhani (without extra butter)',
      '2 rotis',
      'Baingan bharta',
      'Sliced onion + green chilli',
    ],
    source: 'homeCooking',
  },
  preWorkout: {
    name: 'Banana Smoothie',
    calories: 190,
    protein: 8,
    items: ['1 banana + 200 ml milk + pinch cinnamon (no sugar)'],
    source: 'homeCooking',
  },
  postWorkout: {
    name: 'Tofu Scramble',
    calories: 290,
    protein: 22,
    items: [
      'Crumbled tofu + bell pepper + onion + soy sauce + chilli flakes + garlic',
      '1 slice multigrain toast',
    ],
    source: 'homeCooking',
  },
  dinner: {
    name: 'Palak Soup + Sprouts Salad',
    calories: 310,
    protein: 20,
    items: [
      'Spinach + garlic soup (1 tbsp cream)',
      'Croutons',
      'Moong sprouts + tomato + lemon + salt + pepper',
    ],
    source: 'homeCooking',
  },
};

const thursday: DayMealPlan = {
  breakfast: {
    name: 'Aloo Methi Paratha',
    calories: 370,
    protein: 28,
    items: [
      '2 thin parathas (1 tsp ghee max)',
      '1 cup curd + green chutney',
      'Green tea',
    ],
    source: 'homeCooking',
  },
  midMorning: {
    name: 'Mixed Fruit + Walnuts',
    calories: 140,
    protein: 3,
    items: ['Papaya + watermelon + pomegranate + lime', '10 walnuts'],
    source: 'homeCooking',
  },
  lunch: {
    name: 'Paneer Tikka Masala + Rice',
    calories: 530,
    protein: 30,
    items: [
      'Paneer tikka masala (minimal oil, no cream)',
      '2 rotis',
      'Small steamed rice (80g dry)',
      'Mixed raita',
    ],
    source: 'homeCooking',
  },
  preWorkout: {
    name: 'Hummus + Crackers + Orange',
    calories: 200,
    protein: 6,
    items: ['2 whole wheat crackers', '2 tbsp hummus', '1 small orange'],
    source: 'homeCooking',
  },
  postWorkout: {
    name: 'Black Bean Burrito Bowl',
    calories: 270,
    protein: 20,
    items: [
      'Black beans + small brown rice + salsa + guacamole + lettuce + curd',
    ],
    source: 'homeCooking',
  },
  dinner: {
    name: 'Moong Dal Soup + Rotis',
    calories: 340,
    protein: 24,
    items: [
      'Clear moong dal (tempered with cumin + garlic)',
      '2 rotis',
      'Stir-fried cabbage with mustard seeds',
    ],
    source: 'homeCooking',
  },
};

const friday: DayMealPlan = {
  breakfast: {
    name: 'Protein Oats Bowl',
    calories: 400,
    protein: 32,
    items: [
      'Quick oats + milk + chia seeds + 1 tbsp peanut butter + sliced banana + cinnamon',
    ],
    source: 'homeCooking',
  },
  midMorning: {
    name: 'Pumpkin Seeds + Guava',
    calories: 130,
    protein: 5,
    items: ['Roasted pumpkin seeds (20g)', '1 guava', 'Black coffee'],
    source: 'homeCooking',
  },
  lunch: {
    name: 'Sarson Ka Saag + Makki Roti',
    calories: 550,
    protein: 33,
    items: [
      'Sarson ka saag',
      '2 makki rotis',
      '1 glass lassi (thin, no sugar, salted)',
      'Onion salad',
    ],
    source: 'restaurant',
  },
  preWorkout: {
    name: 'Makhana + Coconut Water',
    calories: 180,
    protein: 5,
    items: ['Peri peri makhana (35g)', '1 tender coconut'],
    source: 'homeCooking',
  },
  postWorkout: {
    name: 'Mediterranean Chickpea Bowl',
    calories: 290,
    protein: 22,
    items: [
      'Roasted chickpeas (olive oil + cumin)',
      'Small quinoa',
      'Cucumber + tomato',
      'Paneer crumbles + lemon dressing',
    ],
    source: 'homeCooking',
  },
  dinner: {
    name: 'Tomato Rasam + Rice + Beans',
    calories: 320,
    protein: 22,
    items: ['Tomato rasam', '1 cup brown rice (small)', 'Stir-fried beans', 'Curd'],
    source: 'homeCooking',
  },
};

const saturday: DayMealPlan = {
  breakfast: {
    name: 'Masala Dosa + Sambar',
    calories: 430,
    protein: 30,
    items: [
      '1 large thin dosa',
      'Sambar',
      'Coconut chutney',
      '1 cup filter coffee (no sugar)',
    ],
    source: 'campusEatery',
  },
  midMorning: {
    name: 'Avocado Toast / Corn Chaat',
    calories: 180,
    protein: 4,
    items: [
      '½ avocado on multigrain bread + chilli flakes + lemon',
      'OR sweet corn chaat',
    ],
    source: 'homeCooking',
  },
  lunch: {
    name: 'Pav Bhaji (Light Version)',
    calories: 580,
    protein: 34,
    items: ['Bhaji (minimal oil)', '2 pav (unbuttered, toasted dry)', 'Cucumber raita'],
    source: 'restaurant',
  },
  preWorkout: {
    name: 'Seasonal Fruit Plate',
    calories: 150,
    protein: 2,
    items: ['Mango / watermelon / pineapple / papaya'],
    source: 'homeCooking',
  },
  postWorkout: {
    name: 'Thai Peanut Noodle Bowl',
    calories: 280,
    protein: 20,
    items: [
      'Rice noodles + peanut butter + soy + garlic + lime + tofu + shredded carrot',
    ],
    source: 'homeCooking',
  },
  dinner: {
    name: 'Clear Veg Broth + Sprouts Chaat',
    calories: 300,
    protein: 18,
    items: [
      'Clear vegetable broth with paneer cubes',
      '1 roti',
      'Sprouts chaat (cold salad)',
    ],
    source: 'homeCooking',
  },
};

const sunday: DayMealPlan = {
  breakfast: {
    name: 'Vegetable Poha',
    calories: 450,
    protein: 26,
    items: [
      'Flattened rice + peas + carrot + onion + mustard seeds + curry leaves + lemon',
      '1 boiled egg on side',
      'Ginger chai (small jaggery)',
    ],
    source: 'homeCooking',
  },
  midMorning: {
    name: 'Corn on the Cob / Bhel Puri',
    calories: 200,
    protein: 4,
    items: [
      'Boiled corn with butter (1 tsp) + lime + chilli',
      'OR bhel puri (home version, no fried sev)',
    ],
    source: 'homeCooking',
  },
  lunch: {
    name: 'Sunday Special (Flexible)',
    calories: 600,
    protein: 30,
    items: [
      'Veg biryani (lighter version)',
      'OR paneer butter masala + 2 plain naan',
      'Raita + salad',
    ],
    source: 'restaurant',
  },
  preWorkout: {
    name: 'Masala Chai + Khakra',
    calories: 150,
    protein: 4,
    items: ['1 cup masala chai (minimal sugar)', '2 khakra crackers'],
    source: 'homeCooking',
  },
  postWorkout: {
    name: 'Rest Day — No Post-Workout',
    calories: 0,
    protein: 0,
    items: ['Full rest day — no workout'],
    source: 'homeCooking',
  },
  dinner: {
    name: 'Dal Tadka + Rotis + Sabzi',
    calories: 320,
    protein: 20,
    items: ['Dal tadka', '2 rotis', 'Any vegetable curry', 'Curd'],
    source: 'homeCooking',
  },
};

export const mealPlan: Record<DayOfWeek, DayMealPlan> = {
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
};
