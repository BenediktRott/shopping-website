import styles from "./FilterSidebar.module.css";

export function FilterSidebar({
  categories,
  selectedCategories,
  onCategoryClicked,
}) {
  const handleChange = (event) => {
    const category = event.target.name;
    onCategoryClicked(category);
  };

  return (
    <details className={styles.categoryDropdown}>
      <summary className={styles.categoryHeader}>Category</summary>

      <form>
        <fieldset>
          {categories.map((category) => (
            <div key={category} className={styles.checkbox}>
              <input
                type="checkbox"
                name={category}
                id={category}
                checked={selectedCategories.includes(category)}
                onChange={handleChange}
              />
              <label htmlFor={category}>
                {capitalizeFirstLetter(category)}
              </label>
            </div>
          ))}
        </fieldset>
      </form>
    </details>
  );
}

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
