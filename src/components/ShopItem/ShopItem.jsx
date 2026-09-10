import { useState } from "react";
import styles from "./ShopItem.module.css";
import { useCartData } from "../../utils/CartDataProvider/CartDataProvider";

export function ShopItem({ data, inactive }) {
  const [count, setCount] = useState(1);
  const { cartItems, addToCart } = useCartData();

  const handleCountChange = (event) => {
    const value = event.target.value;
    if (value === "") {
      setCount(""); // Allow user to erase input backspace fully
      return;
    }
    const parsed = parseInt(value, 10);
    if (parsed < 1) return;
    setCount(parsed);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={`${styles.itemCard} ${inactive ? styles.inactive : ""}`}>
      <img src={data.image} alt="" />
      <h2>{data.title}</h2>

      <span>{data.price}€</span>
      <div className={styles.bottomRow}>
        <div className={styles.cartContainer}>
          <form className={styles.counter} onSubmit={handleOnSubmit}>
            <input
              type="number"
              name="count"
              id="count"
              value={count}
              onChange={handleCountChange}
            />
          </form>
          <button
            className={`${styles.addToCart} ${styles.button}`}
            onClick={() => addToCart(data, count)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
