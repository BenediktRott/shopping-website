import { render } from "@testing-library/react";
import { CartDataProvider } from "./CartDataProvider/CartDataProvider";

const AllProviders = ({ children }) => (
  <CartDataProvider>{children}</CartDataProvider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
