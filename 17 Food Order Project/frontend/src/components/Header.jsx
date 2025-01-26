import logoImage from '../assets/logo.jpg';

export function Header({ cart, onOpenCart }) {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImage} alt="a plate with some food and drinks" />
        <h1>ReactFood</h1>
      </div>
      <button id="shopping-cart" className="button" onClick={onOpenCart}>
        Cart ({cart.numItems})
      </button>
    </header>
  );
}
