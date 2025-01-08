import headerLogo from '../assets/investment-calculator-logo.png';

export function Header() {
  return (
    <header id="header">
      <img src={headerLogo} alt="Logo showing a money bag" />
      <h1>React Investment Calculator</h1>
    </header>
  );
}
