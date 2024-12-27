import { useState } from 'react';

// You can dynamically assign the button container type/tag via the prop 'ButtonsContainer'.
// The value must be assigned to a variable whose name begins with a capital letter, in order to be used as a JSX tag.
// The value can be either a string that contains the name of a builtin HTML tag or a reference to a custom component.
// Examples:
// ButtonsContainer="menu"
// ButtonsContainer="div"
// ButtonsContainer={Section}
//
export function TabMenu({ buttons, content, defaultContent = <p>Please select a tab.</p>, ButtonsContainer = 'menu' }) {
  const [selectedButton, selectButton] = useState(null);
  return (
    <div className="tab-menu">
      <ButtonsContainer>
        {buttons.map((name) => (
          <li key={name}>
            <button className={selectedButton === name ? 'active' : ''} onClick={() => selectButton(name)}>
              {name}
            </button>
          </li>
        ))}
      </ButtonsContainer>
      <div id="tab-content">
        {selectedButton === null && defaultContent}
        {selectedButton !== null && content(selectedButton)}
      </div>
    </div>
  );
}
