import { NavLink } from "react-router-dom";
import { PiGooglePhotosLogoBold } from "react-icons/pi";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <div className={styles.navContainer}>
      <NavLink to="/">
        <div className={styles.logoContainer}>
          <PiGooglePhotosLogoBold />
          <h1 className={styles.logoText}>Gallery</h1>
        </div>
      </NavLink>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/home">HOME</NavLink>
        </li>
        <li>
          <NavLink to="/history">HiSTORY</NavLink>
        </li>
      </ul>
    </div>
  );
}
