import { createContext } from 'react';

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
