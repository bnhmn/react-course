import useLocalStorageState from 'use-local-storage-state';

export function TabMenu({ buttons, content, defaultSelected }) {
  defaultSelected = defaultSelected ?? buttons[0];
  const [selected, setSelected] = useLocalStorageState('selected-button', { defaultValue: defaultSelected });
  return (
    <div className="tabs">
      <menu>
        {buttons.map((name) => (
          <button key={name} className={selected === name ? 'active' : ''} onClick={() => setSelected(name)}>
            {name}
          </button>
        ))}
      </menu>
      <div className="content">{content(selected)}</div>
    </div>
  );
}
