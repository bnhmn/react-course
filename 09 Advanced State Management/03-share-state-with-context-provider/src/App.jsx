import { Header } from './components/Header';
import { Shop } from './components/Shop';
import { CartContextProvider } from './store/cart-context';

export default function App() {
  return (
    <CartContextProvider>
      <Header />
      <Shop />
    </CartContextProvider>
  );
}
