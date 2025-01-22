import { DUMMY_PRODUCTS } from './products';

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

function findCartItemById(cart, productId) {
  const index = cart.items.findIndex((item) => item.id === productId);
  const item = cart.items[index];
  return [item, index];
}

function findProductById(productId) {
  return DUMMY_PRODUCTS.find((product) => product.id === productId);
}
