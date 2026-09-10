import { Link } from "react-router";
import styles from "./NavBar.module.css";
import { useCartData } from "../../utils/CartDataProvider/CartDataProvider";
import { useEffect, useState } from "react";

export function NavBar() {
  const { cartCount } = useCartData();
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 200);
  }, [cartCount]);

  return (
    <nav className={styles.navBar}>
      <Link to={"/"} className={`${styles.link} ${styles.logo}`}>
        <h1>MyShop</h1>
      </Link>

      <Link to={"/"} className={styles.link}>
        Home
      </Link>
      <Link to={"shop"} className={styles.link}>
        Shop
      </Link>
      <Link to={"cart"} className={`${styles.link} ${styles.cart}`}>
        <span>Cart</span>
        <span
          className={`${styles.cartCount} ${animation ? styles.animation : ""}`}
        >
          {cartCount}
        </span>
      </Link>
    </nav>
  );
}
