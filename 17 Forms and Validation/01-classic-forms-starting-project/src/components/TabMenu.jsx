import { useState } from 'react';

export function TabMenu({ buttons, content }) {
  const [selectedButton, selectButton] = useState(buttons[0]);
  return (
    <div className="tabs">
      <menu>
        {buttons.map((name) => (
          <button key={name} className={selectedButton === name ? 'active' : ''} onClick={() => selectButton(name)}>
            {name}
          </button>
        ))}
      </menu>
      <div className="content">{content(selectedButton)}</div>
    </div>
  );
}
