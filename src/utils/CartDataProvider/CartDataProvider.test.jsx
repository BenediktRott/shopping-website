import { render, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CartDataProvider, useCartData } from "./CartDataProvider";
import { act } from "react";

describe("CartDataProvider", () => {
  const wrapper = ({ children }) => (
    <CartDataProvider>{children}</CartDataProvider>
  );

  test("Initially empty", () => {
    const { result } = renderHook(() => useCartData(), { wrapper });
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.cartCount).toEqual(0);
  });

  test("Add new item", () => {
    const { result } = renderHook(() => useCartData(), { wrapper });
    const product = { id: 101, title: "Backpack", price: 50 };

    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.cartItems).toEqual([
      { id: 101, title: "Backpack", price: 50, quantity: 1 },
    ]);
    expect(result.current.cartCount).toEqual(1);
  });

  test("Add existing item", () => {
    const { result } = renderHook(() => useCartData(), { wrapper });
    const product = { id: 101, title: "Backpack", price: 50 };

    act(() => {
      result.current.addToCart(product);
    });

    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.cartItems).toEqual([
      { id: 101, title: "Backpack", price: 50, quantity: 2 },
    ]);
    expect(result.current.cartCount).toEqual(2);
  });

  test("Add multiple at once", () => {
    const { result } = renderHook(() => useCartData(), { wrapper });
    const product = { id: 101, title: "Backpack", price: 50 };

    act(() => {
      result.current.addToCart(product, 3);
    });

    act(() => {
      result.current.addToCart(product, 2);
    });

    expect(result.current.cartItems).toEqual([
      { id: 101, title: "Backpack", price: 50, quantity: 5 },
    ]);
    expect(result.current.cartCount).toEqual(5);
  });

  test("Add distinct", () => {
    const { result } = renderHook(() => useCartData(), { wrapper });
    const product = { id: 101, title: "Backpack", price: 50 };
    const product2 = { id: 102, title: "foo", price: 50 };

    act(() => {
      result.current.addToCart(product, 3);
    });

    act(() => {
      result.current.addToCart(product2, 2);
    });

    expect(result.current.cartItems).toEqual([
      { id: 101, title: "Backpack", price: 50, quantity: 3 },
      { id: 102, title: "foo", price: 50, quantity: 2 },
    ]);
    expect(result.current.cartCount).toEqual(5);
  });

  test("Update Quantity", () => {
    const { result } = renderHook(() => useCartData(), { wrapper });
    const product = { id: 101, title: "Backpack", price: 50 };
    const product2 = { id: 102, title: "foo", price: 50 };

    act(() => {
      result.current.addToCart(product, 3);
    });

    act(() => {
      result.current.updateQuantity(product, 5);
    });

    expect(result.current.cartItems).toEqual([
      { id: 101, title: "Backpack", price: 50, quantity: 5 },
    ]);
  });
});
