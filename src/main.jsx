import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { router } from "./pages/routes.jsx";
import { RouterProvider } from "react-router";
import { ShopDataProvider } from "./utils/ShopDataProvider.jsx";
import { CartDataProvider } from "./utils/CartDataProvider/CartDataProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShopDataProvider>
      <CartDataProvider>
        <RouterProvider router={router} />
      </CartDataProvider>
    </ShopDataProvider>
  </StrictMode>,
);
