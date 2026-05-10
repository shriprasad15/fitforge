export interface FoodGuideEntry {
  choose: string[];
  avoid: string[];
}

export const campusEateryGuide: Record<string, FoodGuideEntry> = {
  breakfast: {
    choose: [
      'Idli + sambar (low oil, high protein)',
      'Masala dosa (thin, not oily)',
      'Poha or upma (if available)',
      'Boiled eggs',
      'Black coffee or tea without sugar',
    ],
    avoid: [
      'Puri bhaji (deep fried, 500+ kcal)',
      'Vada pav (fried, calorie bomb)',
      'Sweet lassi or flavored milk',
      'White bread sandwiches with mayo',
      'Biscuits and packaged cakes',
    ],
  },
  lunch: {
    choose: [
      'Dal + rice + sabzi combo (ask for less oil)',
      'Curd rice',
      'Roti + dal + salad',
      'Rajma/chole with minimal gravy',
      'Buttermilk or plain chaas',
    ],
    avoid: [
      'Fried rice or noodles (maida + oil)',
      'Paneer butter masala (restaurant style — too much cream)',
      'Extra roti with butter',
      'Sugary drinks or cola',
      'Gulab jamun or heavy desserts',
    ],
  },
  dinner: {
    choose: [
      'Soup + roti (light and filling)',
      'Dal + 2 rotis + salad',
      'Sprouts chaat or salad bowl',
      'Paneer tikka (grilled, not fried)',
      'Curd/raita as accompaniment',
    ],
    avoid: [
      'Heavy curries after 9 PM',
      'Fried snacks (samosa, pakora)',
      'Ice cream or mithai',
      'Large portions of rice at night',
      'Maggi or instant noodles',
    ],
  },
};

export const restaurantGuide: Record<string, FoodGuideEntry> = {
  southIndian: {
    choose: [
      'Plain dosa or masala dosa (ask for less oil)',
      'Idli + sambar + chutney',
      'Uttapam (thick, less oil than dosa)',
      'Rasam rice',
      'Filter coffee (no sugar)',
    ],
    avoid: [
      'Ghee roast dosa (300+ kcal extra from ghee)',
      'Vada (deep fried)',
      'Kesari bath (pure sugar + ghee)',
      'Mysore pak or sweets',
      'Fried rice items',
    ],
  },
  northIndian: {
    choose: [
      'Tandoori paneer/vegetables',
      'Dal makhani (ask for less butter)',
      'Roti/naan (plain, not butter naan)',
      'Raita and salad',
      'Chole without extra oil',
    ],
    avoid: [
      'Butter chicken-style gravies (cream-heavy)',
      'Butter naan or garlic naan (200 kcal each)',
      'Fried appetizers (paneer pakora, aloo tikki)',
      'Shahi paneer (cream + cashew paste)',
      'Biryani with extra ghee',
    ],
  },
  continental: {
    choose: [
      'Grilled paneer/tofu with vegetables',
      'Soup + multigrain bread',
      'Pasta in tomato/olive oil base (not cream)',
      'Salad with protein (chickpeas, paneer, tofu)',
      'Baked/grilled items over fried',
    ],
    avoid: [
      'Cream-based pasta (alfredo, carbonara)',
      'French fries or wedges',
      'Cheese-heavy dishes',
      'Deep-fried items (fish and chips style)',
      'Sugary mocktails and shakes',
    ],
  },
  swiggyTips: {
    choose: [
      'Search "high protein" or "healthy" filters',
      'Bowl meals (usually portion-controlled)',
      'Grilled wraps over fried options',
      'Customizable bowls — load up on protein',
      'Check calorie count if listed on app',
    ],
    avoid: [
      'Combo meals (usually oversized portions)',
      'Free dessert offers (empty calories)',
      'Fried sides that come "free" with orders',
      'Thick-crust pizza or cheese-heavy items',
      'Ordering when extremely hungry (leads to over-ordering)',
    ],
  },
};
