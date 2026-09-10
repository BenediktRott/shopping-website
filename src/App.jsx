import { useState } from "react";
import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { RootLayout } from "./components/RootLayout/RootLayout";
import { ShopDataProvider } from "./utils/ShopDataProvider";

function App() {
  return (
    <>
      <RootLayout />
    </>
  );
}

export default App;
