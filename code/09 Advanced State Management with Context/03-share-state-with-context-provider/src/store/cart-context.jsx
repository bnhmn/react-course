import { createContext, useState } from 'react';
import { DUMMY_PRODUCTS } from '../data/products';

// A context needs to start with an uppercase letter because it works like a component.
// The argument of createContext() should be the intial context value. Although this initial value
// is overwritten on the caller side, it is still useful because it enables IDE auto completion.
// https://react.dev/learn/passing-data-deeply-with-context

// Disclaimer:
// Context is very tempting to use! However, this also means it’s too easy to overuse it.
// Just because you need to pass some props several levels deep doesn’t mean you should put that information into
// context! https://react.dev/learn/passing-data-deeply-with-context#before-you-use-context

export const CartContext = createContext({
  items: [],
  addCartItem: (productId) => null,
  changeItemQuantity: (productId, amount) => null,
});

// We can extract all the context handling into a custom component
export function CartContextProvider({ children }) {
  const [cart, setCart] = useState({ items: [] });
  const cartContext = {
    ...cart,
    addCartItem: (productId) => {
      setCart((prevCart) => addProductToCart(prevCart, productId));
    },
    changeItemQuantity: (productId, amount) => {
      setCart((prevCart) => changeProductQuantity(prevCart, productId, amount));
    },
  };
  return <CartContext value={cartContext}>{children}</CartContext>;
}

export function addProductToCart(cart, productId) {
  const newCart = structuredClone(cart);
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
  const newCart = structuredClone(cart);
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
