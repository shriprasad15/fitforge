'use client';

import { useState } from 'react';

type ShoppingCategory = 'groceries' | 'supplements' | 'gymGear' | 'swimGear' | 'kitchen';

interface ShoppingItem {
  id: string;
  name: string;
  category: ShoppingCategory;
  quantity?: string;
  estimatedPrice?: string;
  priority: 'essential' | 'recommended' | 'optional';
  notes?: string;
}

const categoryLabels: Record<ShoppingCategory, string> = {
  groceries: 'Groceries',
  supplements: 'Supplements',
  gymGear: 'Gym Gear',
  swimGear: 'Swim Gear',
  kitchen: 'Kitchen',
};

const priorityColors: Record<string, string> = {
  essential: 'text-red-400 bg-red-500/10 border-red-500/30',
  recommended: 'text-accent-gold bg-accent-gold/10 border-accent-gold/30',
  optional: 'text-text-muted bg-white/5 border-white/10',
};

const defaultItems: ShoppingItem[] = [
  { id: 'g1', name: 'Rolled Oats', category: 'groceries', quantity: '1 kg', estimatedPrice: '₹180', priority: 'essential' },
  { id: 'g2', name: 'Peanut Butter (unsweetened)', category: 'groceries', quantity: '1 kg', estimatedPrice: '₹350', priority: 'essential' },
  { id: 'g3', name: 'Eggs', category: 'groceries', quantity: '30 pack', estimatedPrice: '₹250', priority: 'essential' },
  { id: 'g4', name: 'Paneer', category: 'groceries', quantity: '400g x 4', estimatedPrice: '₹400', priority: 'essential' },
  { id: 'g5', name: 'Brown Rice', category: 'groceries', quantity: '5 kg', estimatedPrice: '₹350', priority: 'essential' },
  { id: 'g6', name: 'Toor/Moong Dal', category: 'groceries', quantity: '2 kg', estimatedPrice: '₹240', priority: 'essential' },
  { id: 'g7', name: 'Mixed Vegetables (weekly)', category: 'groceries', quantity: '2 kg', estimatedPrice: '₹200', priority: 'essential' },
  { id: 'g8', name: 'Bananas + Seasonal Fruits', category: 'groceries', quantity: 'weekly', estimatedPrice: '₹150', priority: 'essential' },
  { id: 'g9', name: 'Greek Yogurt / Hung Curd', category: 'groceries', quantity: '500g x 2', estimatedPrice: '₹200', priority: 'recommended' },
  { id: 'g10', name: 'Almonds + Chia Seeds', category: 'groceries', quantity: '250g each', estimatedPrice: '₹500', priority: 'recommended' },
  { id: 'g11', name: 'Chicken Breast', category: 'groceries', quantity: '1 kg', estimatedPrice: '₹350', priority: 'recommended' },
  { id: 'g12', name: 'Tofu', category: 'groceries', quantity: '400g x 2', estimatedPrice: '₹200', priority: 'recommended' },
  { id: 's1', name: 'Whey Protein (ON Gold Standard)', category: 'supplements', quantity: '2 lb', estimatedPrice: '₹3500', priority: 'essential' },
  { id: 's2', name: 'Creatine Monohydrate', category: 'supplements', quantity: '250g', estimatedPrice: '₹600', priority: 'recommended' },
  { id: 's3', name: 'Fish Oil Capsules', category: 'supplements', quantity: '60 caps', estimatedPrice: '₹400', priority: 'recommended' },
  { id: 's4', name: 'Multivitamin', category: 'supplements', quantity: '30 tabs', estimatedPrice: '₹350', priority: 'optional' },
  { id: 'gm1', name: 'Lifting Gloves', category: 'gymGear', estimatedPrice: '₹500', priority: 'recommended' },
  { id: 'gm2', name: 'Wrist Wraps', category: 'gymGear', estimatedPrice: '₹400', priority: 'optional' },
  { id: 'gm3', name: 'Resistance Bands (set)', category: 'gymGear', estimatedPrice: '₹600', priority: 'recommended' },
  { id: 'gm4', name: 'Shaker Bottle', category: 'gymGear', estimatedPrice: '₹250', priority: 'essential' },
  { id: 'sw1', name: 'Swimming Goggles', category: 'swimGear', estimatedPrice: '₹400', priority: 'essential' },
  { id: 'sw2', name: 'Swim Cap', category: 'swimGear', estimatedPrice: '₹200', priority: 'recommended' },
  { id: 'sw3', name: 'Kickboard', category: 'swimGear', estimatedPrice: '₹500', priority: 'essential', notes: 'Check if pool provides one first' },
  { id: 'sw4', name: 'Ear Plugs (swimming)', category: 'swimGear', estimatedPrice: '₹150', priority: 'optional' },
  { id: 'k1', name: 'Food Scale (digital)', category: 'kitchen', estimatedPrice: '₹500', priority: 'essential' },
  { id: 'k2', name: 'Meal Prep Containers (5-pack)', category: 'kitchen', estimatedPrice: '₹600', priority: 'recommended' },
  { id: 'k3', name: 'Blender / Mixer', category: 'kitchen', estimatedPrice: '₹1500', priority: 'optional', notes: 'For protein shakes and smoothies' },
];

export default function ShoppingPage() {
  const [purchased, setPurchased] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<ShoppingCategory | 'all'>('all');

  const toggle = (id: string) => {
    setPurchased((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories: (ShoppingCategory | 'all')[] = ['all', 'groceries', 'supplements', 'gymGear', 'swimGear', 'kitchen'];
  const filtered = activeCategory === 'all' ? defaultItems : defaultItems.filter((i) => i.category === activeCategory);
  const totalEstimate = defaultItems.reduce((sum, item) => {
    const price = parseInt(item.estimatedPrice?.replace(/[₹,]/g, '') || '0');
    return sum + price;
  }, 0);
  const purchasedCount = Object.values(purchased).filter(Boolean).length;

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Shopping List</h1>
        <span className="text-xs text-text-muted">{purchasedCount}/{defaultItems.length} bought</span>
      </div>

      <div className="bg-bg-card rounded-xl p-4 border border-white/5">
        <p className="text-xs text-text-muted">Estimated Total Budget</p>
        <p className="text-xl font-bold text-accent-coral">₹{totalEstimate.toLocaleString()}</p>
      </div>

      {/* Category filter */}
      <div className="flex gap-1 bg-bg-elevated rounded-lg p-1 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs font-medium py-2 px-3 rounded-md transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-accent-teal text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {cat === 'all' ? 'All' : categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="space-y-1.5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
              purchased[item.id]
                ? 'bg-white/2 border-white/5 opacity-60'
                : 'bg-bg-card border-white/5'
            }`}
          >
            <button
              onClick={() => toggle(item.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                purchased[item.id]
                  ? 'bg-accent-teal border-accent-teal'
                  : 'border-white/20 hover:border-accent-teal'
              }`}
            >
              {purchased[item.id] && <span className="text-[10px] text-white">✓</span>}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${purchased[item.id] ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                {item.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                {item.quantity && <span className="text-[10px] text-text-muted">{item.quantity}</span>}
                {item.estimatedPrice && <span className="text-[10px] text-accent-gold">{item.estimatedPrice}</span>}
                {item.notes && <span className="text-[10px] text-text-muted italic">— {item.notes}</span>}
              </div>
            </div>
            <span className={`text-[9px] px-1.5 py-0.5 rounded border shrink-0 ${priorityColors[item.priority]}`}>
              {item.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
