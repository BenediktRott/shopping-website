import { useEffect, useState } from "react";
import { useCartData } from "../../utils/CartDataProvider/CartDataProvider";
import styles from "./CartItem.module.css";

export function CartItem({ data }) {
  //const [count, setCount] = useState(getItemQuantity(data))
  const { updateQuantity, getItemQuantity, deleteItem } = useCartData();
  const cartQuantity = getItemQuantity(data);
  const [inputValue, setInputValue] = useState(cartQuantity);

  useEffect(() => {
    setInputValue(cartQuantity);
  }, [cartQuantity]);

  const handleCountChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value === "") return;

    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed > 0) {
      updateQuantity(data, parsed);
    }
  };

  const handleBlurOrSubmit = (event) => {
    if (event) event.preventDefault();

    if (inputValue === "" || parseInt(inputValue, 10) <= 0) {
      deleteItem(data);
    }
  };

  return (
    <div className={styles.cartItem}>
      <img src={data.image} alt={data.title} />
      <div className={styles.info}>
        <h2>{data.title}</h2>
        <form className={styles.counter} onSubmit={handleBlurOrSubmit}>
          <label htmlFor={`count-${data.id}`}>Quantity</label>
          <input
            type="number"
            name="count"
            id={`count-${data.id}`}
            value={inputValue}
            onChange={handleCountChange}
            onBlur={handleBlurOrSubmit}
            min="0"
          />
        </form>
      </div>
      <h2>{(data.price * getItemQuantity(data)).toFixed(2)} €</h2>
    </div>
  );
}
