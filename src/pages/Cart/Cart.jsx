import { href } from "react-router";
import { CartItem } from "../../components/CartItem/CartItem";
import { ShopItem } from "../../components/ShopItem/ShopItem";
import { useCartData } from "../../utils/CartDataProvider/CartDataProvider";
import styles from "./Cart.module.css";

export function Cart() {
  const { cartItems, addToCart, getTotal } = useCartData();
  return (
    <div className={styles.cartPage}>
      <h1>Cart</h1>
      <section className={styles.cartContainer}>
        {cartItems.map((item) => (
          <>
            <CartItem data={item} key={item.id} />
            <hr></hr>
          </>
        ))}
      </section>
      <div className={styles.totalRow}>
        <h1 className={styles.total}>Total:</h1>
        <h1 className={styles.totalValue}>{getTotal().toFixed(2)} €</h1>
      </div>
      <div className={styles.checkout}>
        <button>Checkout</button>
      </div>
    </div>
  );
}
