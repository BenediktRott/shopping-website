import { useEffect, useState } from "react";
import { HorizontalPager } from "../../components/HorizontalPager/HorizontalPager";
import { ShopItem } from "../../components/ShopItem/ShopItem";
import styles from "./Home.module.css";
import { useShopData } from "../../utils/ShopDataProvider";

export function Home() {
  const { data, loading, error } = useShopData();

  let pager;

  if (error) {
    pager = <h1>Error</h1>;
  } else if (loading) {
    pager = <h1>Loading</h1>;
  } else {
    let newItems = data.slice(0, 5);
    pager = (
      <HorizontalPager>
        {newItems.map((item) => (
          <ShopItem data={item} key={item.id} />
        ))}
      </HorizontalPager>
    );
  }

  return (
    <>
      <div className={styles.banner}>
        <h1>New Items!</h1>
        {pager}
      </div>
      <div className={styles.categories}>
        <h1>Shop by Categories</h1>
        <div className={styles.gridContainer}>
          <button className={styles.men}>
            <div className={styles.imageWrapper}>
              <img src="src/assets/img/man.jpg" alt="Man" />
            </div>
            <h1>Men</h1>
          </button>
          <button className={styles.women}>
            <div className={styles.imageWrapper}>
              <img src="src/assets/img/woman.jpg" alt="Woman" />
            </div>
            <h1>Women</h1>
          </button>
          <button className={styles.explore}>
            <div className={styles.imageWrapper}>
              <img src="src/assets/img/explore.jpg" alt="Mountains" />
            </div>
            <h1>Explore</h1>
          </button>
        </div>
      </div>
    </>
  );
}
