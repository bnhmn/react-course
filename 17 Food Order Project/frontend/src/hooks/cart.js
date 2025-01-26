import { useCallback, useState } from 'react';

export function useShoppingCartStore() {
  const [items, setItems] = useState([]);

  const numItems = items.reduce((prev, cur) => prev + cur.amount, 0);
  const totalPrice = items.reduce((prev, cur) => prev + cur.amount * parseFloat(cur.price), 0).toFixed(2);

  const addItem = useCallback((item) => {
    setItems((items) => addItemToCart(items, item));
  }, []);

  const increaseAmount = useCallback((itemId) => {
    setItems((items) => changeItemAmount(items, itemId, 1));
  }, []);

  const decreaseAmount = useCallback((itemId) => {
    setItems((items) => changeItemAmount(items, itemId, -1));
  }, []);

  return { items, numItems, totalPrice, addItem, increaseAmount, decreaseAmount };
}

function addItemToCart(items = [], item) {
  const newItems = structuredClone(items);
  const [existingItem, index] = findItemById(items, item.id);
  if (existingItem) {
    newItems[index].amount += 1;
  } else {
    newItems.push({ ...item, amount: 1 });
  }
  return newItems;
}

function changeItemAmount(items = [], itemId, deltaAmount) {
  const newItems = structuredClone(items);
  const [item, index] = findItemById(items, itemId);
  if (item.amount + deltaAmount >= 1) {
    newItems[index].amount += deltaAmount;
  } else {
    newItems.splice(index, 1);
  }
  return newItems;
}

function findItemById(items = [], itemId) {
  const index = items.findIndex((meal) => meal.id === itemId);
  const item = items[index];
  return [item, index];
}
