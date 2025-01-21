import { useState } from 'react';

export function TabMenu({ buttons, content, defaultContent = <p>Please select a tab.</p> }) {
  const [selectedButton, selectButton] = useState(null);
  return (
    <div className="tab-menu">
      <menu>
        {buttons.map((name) => (
          <li key={name}>
            <button className={selectedButton === name ? 'active' : ''} onClick={() => selectButton(name)}>
              {name}
            </button>
          </li>
        ))}
      </menu>
      <div id="tab-content">
        {selectedButton === null && defaultContent}
        {selectedButton !== null && content(selectedButton)}
      </div>
    </div>
  );
}
