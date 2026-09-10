import { createBrowserRouter } from "react-router";
import App from "../App";
import { Home } from "./Home/Home";
import { Shop } from "./Shop";
import { Cart } from "./Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
    ],
  },
]);
