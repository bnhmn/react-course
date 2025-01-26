import { ShoppingCartItem } from './ShoppingCartItem';

export function ShoppingCart({ cart, onClose, onContinue }) {
  const hasItems = cart.items.length >= 1;
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {!hasItems && <p>Your cart is empty!</p>}
      {hasItems && (
        <div>
          {cart.items.map((item) => (
            <ShoppingCartItem
              key={item.id}
              name={item.name}
              amount={item.amount}
              price={item.price}
              onIncreaseAmount={() => cart.increaseAmount(item.id)}
              onDecreaseAmount={() => cart.decreaseAmount(item.id)}
            />
          ))}
        </div>
      )}
      <p className="cart-total">
        <strong>${cart.totalPrice}</strong>
      </p>
      <div className="modal-actions">
        <button className="text-button" onClick={onClose}>
          Close
        </button>
        <button className="button" onClick={onContinue} disabled={!hasItems}>
          Go to Checkout
        </button>
      </div>
    </div>
  );
}
