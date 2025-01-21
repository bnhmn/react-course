import { DUMMY_PRODUCTS } from '../lib/products.js';
import { Product } from './Product.jsx';

export function Shop({ onAddCartItem }) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={onAddCartItem} />
          </li>
        ))}
      </ul>
    </section>
  );
}
