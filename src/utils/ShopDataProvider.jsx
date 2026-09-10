import { createContext, useContext, useEffect, useMemo, useState } from "react";

const Context = createContext();

export const ShopDataProvider = ({ children }) => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server Error");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({ data, loading, error }),
    [data, loading, error],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useShopData = () => useContext(Context);
