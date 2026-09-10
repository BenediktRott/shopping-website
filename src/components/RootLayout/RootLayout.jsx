import { Outlet } from "react-router";
import { NavBar } from "../NavBar/NavBar";
import styles from "./RootLayout.module.css";

export function RootLayout() {
  return (
    <div className={styles.root}>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <footer>
        <h3>MyShop - est. 2026</h3>
      </footer>
    </div>
  );
}
