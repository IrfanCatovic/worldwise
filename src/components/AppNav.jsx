import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
          {/*dodali smo link za countries, ovo nas vodi na rutu countries i prikazuje countrieslist komponentu*/}
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
