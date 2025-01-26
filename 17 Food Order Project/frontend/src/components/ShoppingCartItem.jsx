export function ShoppingCartItem({ name, amount, price, onIncreaseAmount, onDecreaseAmount }) {
  return (
    <li className="cart-item">
      <p>
        {name} - ${price}
      </p>
      <div className="cart-item-actions">
        <button onClick={onDecreaseAmount}>-</button>
        <span>{amount}</span>
        <button onClick={onIncreaseAmount}>+</button>
      </div>
    </li>
  );
}
