import { NavLink, Outlet } from 'react-router';

import classes from './MainNavigation.module.css';

interface MainNavigationProps {
  links: { [label: string]: string };
}

export function MainNavigation({ links }: MainNavigationProps) {
  // See https://reactrouter.com/start/library/navigating
  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul className={classes.list}>
            {Object.entries(links).map(([label, uri]) => (
              <li key={uri}>
                <NavLink to={uri}>{label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
