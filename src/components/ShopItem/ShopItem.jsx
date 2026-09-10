import { useState } from "react";
import styles from "./ShopItem.module.css";

export function ShopItem({ data, inactive }) {
  const [count, setCount] = useState(1);

  const handleCountChange = (event) => {
    setCount(parseInt(event.target.value));
  };

  const handleOnAdd = () => {
    if (inactive) return;
    setCount(count + 1);
  };

  const handleOnSubtract = () => {
    if (inactive) return;
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className={styles.itemCard}>
      <img src={data.image} alt="" />
      <h2>{data.title}</h2>
      <div className={`${styles.buttons} ${inactive ? styles.inactive : ""}`}>
        <button className={`${styles.addToCart} ${styles.button}`}>
          Add to Cart
        </button>
        <div className={styles.counter}>
          <button onClick={handleOnAdd} className={styles.button}>
            +
          </button>
          <form>
            <input
              type="number"
              name="count"
              id="count"
              value={count}
              onChange={handleCountChange}
            />
          </form>
          <button onClick={handleOnSubtract} className={styles.button}>
            -
          </button>
        </div>
      </div>
    </div>
  );
}
