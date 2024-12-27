// 'children' is a special prop that refers to the text between the component's opening and closing tags (innerHTML)
export function TabButton({ children, isActive, onClick }) {
  return (
    <li>
      <button className={isActive ? 'active' : ''} onClick={onClick}>
        {children}
      </button>
    </li>
  );
}
