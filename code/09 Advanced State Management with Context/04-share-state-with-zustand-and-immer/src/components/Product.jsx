import { useShoppingCartStore } from '../store/shoppingCart';

export function Product({ id, image, title, price, description }) {
  // With the useCartStore hook we can access the shared state value.
  const addCartItem = useShoppingCartStore((cart) => cart.addCartItem);
  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">${price}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          <button onClick={() => addCartItem(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
