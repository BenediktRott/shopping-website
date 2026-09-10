import { useState } from "react";
import { FilterSidebar } from "../../components/FilterSidebar/FilterSidebar";
import { ShopItem } from "../../components/ShopItem/ShopItem";
import { useShopData } from "../../utils/ShopDataProvider";
import styles from "./Shop.module.css";

export function Shop() {
  const { data, loading, error } = useShopData();
  const [selectedCategories, setSelectedCategories] = useState([]);

  if (loading || error) return <div></div>;

  const categories = [...new Set(data.map((item) => item.category))];

  const handleCategoryClicked = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const filteredProducts =
    selectedCategories.length === 0
      ? data
      : data.filter((item) => selectedCategories.includes(item.category));
  return (
    <div className={styles.page}>
      <h1>Shop our Products</h1>
      <section className={styles.shopContainer}>
        <FilterSidebar
          selectedCategories={selectedCategories}
          categories={categories}
          onCategoryClicked={handleCategoryClicked}
        />

        <section className={styles.shop}>
          {filteredProducts.map((item) => (
            <ShopItem data={item} key={item.id} />
          ))}
        </section>
      </section>
    </div>
  );
}
