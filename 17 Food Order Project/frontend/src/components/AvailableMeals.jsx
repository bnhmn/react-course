import { useMealsBackend } from '../hooks/backend';
import { AvailableMeal } from './AvailableMeal';

export function AvailableMeals({ cart }) {
  const [availableMeals, isLoading] = useMealsBackend();
  return (
    <>
      {isLoading && <span className="loader"></span>}
      {!isLoading && (
        <div id="meals">
          {availableMeals.map((meal) => (
            <AvailableMeal
              key={meal.id}
              name={meal.name}
              image={meal.image}
              price={meal.price}
              description={meal.description}
              onAddToCart={() => cart.addItem(meal)}
            />
          ))}
        </div>
      )}
    </>
  );
}
