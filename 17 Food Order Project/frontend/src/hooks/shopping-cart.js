import { useState } from 'react';

export function useShoppingCartStore() {
  const [items, setItems] = useState([]);
  const numItems = items.length;

  return { items, numItems };
}
