export type ShoppingCategory = 'groceries' | 'supplements' | 'gymGear' | 'swimGear' | 'kitchen';

export interface ShoppingItem {
  id: string;
  name: string;
  category: ShoppingCategory;
  quantity?: string;
  estimatedPrice?: string;
  priority: 'essential' | 'recommended' | 'optional';
  purchased?: boolean;
  notes?: string;
}
