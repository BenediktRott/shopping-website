import { Link } from "react-router";
import styles from "./NavBar.module.css";

export function NavBar() {
  return (
    <nav className={styles.navBar}>
      <h1>MyShop</h1>
      <Link to={"/"} className={styles.link}>
        Home
      </Link>
      <Link to={"shop"} className={styles.link}>
        Shop
      </Link>
      <Link to={"cart"} className={styles.link}>
        Cart
      </Link>
    </nav>
  );
}
