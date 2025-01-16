import { create } from 'zustand';
import { DUMMY_PRODUCTS } from '../data/products';

// Zustand is a state management library that can be used to share state with multiple components
// It works similar to useContext but is much simpler.
// https://github.com/pmndrs/zustand

export const useShoppingCartStore = create((set) => ({
  items: [],
  addCartItem: (productId) => {
    set((cart) => addProductToCart(cart, productId));
  },
  changeItemQuantity: (productId, amount) => {
    set((cart) => changeProductQuantity(cart, productId, amount));
  },
}));

export function addProductToCart(cart, productId) {
  const newCart = { items: [...cart.items] };
  const [oldItem, index] = findCartItemById(newCart, productId);
  if (oldItem) {
    newCart.items[index] = { ...oldItem, quantity: oldItem.quantity + 1 };
  } else {
    const product = findProductById(productId);
    newCart.items.push({ id: productId, name: product.title, price: product.price, quantity: 1 });
  }
  return newCart;
}

export function changeProductQuantity(cart, productId, amount) {
  const newCart = { items: [...cart.items] };
  const [oldItem, index] = findCartItemById(newCart, productId);
  if (oldItem.quantity + amount > 0) {
    newCart.items[index] = { ...oldItem, quantity: oldItem.quantity + amount };
  } else {
    newCart.items.splice(index, 1);
  }
  return newCart;
}

export function computeNumCartItems(cart) {
  return cart.items.reduce((prev, curr) => prev + curr.quantity, 0);
}

export function computeTotalPrice(cart) {
  return cart.items.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
}

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
