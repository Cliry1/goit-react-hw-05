import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
const buildLinkClass = ({ isActive }) => {
  return clsx(css.navigationLink, isActive && css.active);
};
export default function Navigation() {
  return (

      <nav className={css.navigation}>
        <NavLink className={buildLinkClass} to="/">Home</NavLink>
        <NavLink className={buildLinkClass} to="/movies">Movies</NavLink>
      </nav>

  );
}