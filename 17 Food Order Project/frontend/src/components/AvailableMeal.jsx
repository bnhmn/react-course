export function AvailableMeal({ name, image, price, description, onAddToCart }) {
  return (
    <div className="meal-item">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p className="meal-item-price">${price}</p>
      <div className="meal-item-description">{description}</div>
      <div className="meal-item-actions">
        <button className="button" onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
