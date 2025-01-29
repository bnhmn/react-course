import { NavLink, Outlet } from 'react-router';

import classes from './EventNavigation.module.css';

interface EventNavigationProps {
  links: { [label: string]: string };
}

export function EventNavigation({
  links = { 'All Events': '/events', 'New Event': '/events/new' },
}: EventNavigationProps) {
  //
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
