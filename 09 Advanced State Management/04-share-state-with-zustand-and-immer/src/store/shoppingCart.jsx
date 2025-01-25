import { produce } from 'immer';
import { create } from 'zustand';
import { DUMMY_PRODUCTS } from '../data/products';

// Zustand is a state management library that can be used to share state with multiple components
// It works similar to useContext but is much simpler.
// https://github.com/pmndrs/zustand

// Immer is a library for manipulating immutable state in a simplified and more readable way.
// Essentially, you can write mutable code and immer turns it into an immutable update of the original state.
// https://immerjs.github.io/immer/produce

export const useShoppingCartStore = create((set) => ({
  items: [],

  addCartItem: (productId) =>
    set(
      produce((cart) => {
        const [cartItem] = findCartItemById(cart, productId);
        if (cartItem) {
          cartItem.quantity += 1;
        } else {
          const product = findProductById(productId);
          cart.items.push({ id: productId, name: product.title, price: product.price, quantity: 1 });
        }
      }),
    ),

  changeItemQuantity: (productId, amount) => {
    set(
      produce((cart) => {
        const [cartItem, index] = findCartItemById(cart, productId);
        if (cartItem.quantity + amount > 0) {
          cartItem.quantity += amount;
        } else {
          cart.items.splice(index, 1);
        }
      }),
    );
  },

  getNumItems() {
    return this.items.reduce((prev, curr) => prev + curr.quantity, 0);
  },

  getTotalPrice() {
    return this.items.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
  },
}));

export function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function findCartItemById(cart, productId) {
  const index = cart.items.findIndex((item) => item.id === productId);
  const item = cart.items[index];
  return [item, index];
}

function findProductById(productId) {
  return DUMMY_PRODUCTS.find((product) => product.id === productId);
}
