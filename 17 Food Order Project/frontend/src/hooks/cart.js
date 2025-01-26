import { useCallback, useState } from 'react';

export function useShoppingCartStore() {
  const [items, setItems] = useState([]);
  const numItems = items.reduce((prev, cur) => prev + cur.amount, 0);

  const addMeal = useCallback((meal) => {
    setItems((prevItems) => {
      const newItems = structuredClone(prevItems);
      const [existingMeal, mealIndex] = findMealById(prevItems, meal.id);
      if (existingMeal) {
        newItems[mealIndex].amount += 1;
      } else {
        newItems.push({ ...meal, amount: 1 });
      }
      return newItems;
    });
  }, []);

  return { items, numItems, addMeal };
}

function findMealById(meals = [], mealId) {
  const index = meals.findIndex((meal) => meal.id === mealId);
  const meal = meals[index];
  return [meal, index];
}
