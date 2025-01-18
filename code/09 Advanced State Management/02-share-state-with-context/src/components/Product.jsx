import { useContext } from 'react';
import { CartContext } from '../store/cart-context';

export function Product({ id, image, title, price, description }) {
  // With the useContext hook we can access the shared context value.
  const cart = useContext(CartContext);
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
          <button onClick={() => cart.addCartItem(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
