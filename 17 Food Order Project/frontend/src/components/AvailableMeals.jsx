import { useMealsBackend } from '../hooks/backend';

export function AvailableMeals({ cart }) {
  const [meals, isLoading] = useMealsBackend();
  return (
    <>
      {isLoading && <span class="loader"></span>}
      {!isLoading && (
        <div id="meals">
          {meals.map((meal) => (
            <div key={meal.id} className="meal-item">
              <img src={meal.image} alt={meal.name} />
              <h3>{meal.name}</h3>
              <p className="meal-item-price">${meal.price}</p>
              <div className="meal-item-description">{meal.description}</div>
              <div className="meal-item-actions">
                <button className="button">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
