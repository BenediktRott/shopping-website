import { describe, expect, test, vi } from "vitest";
import { ShopItem } from "./ShopItem";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { CartDataProvider } from "../../utils/CartDataProvider/CartDataProvider";

describe("Counter", () => {
  test("can type", async () => {
    const user = userEvent.setup();
    render(
      <CartDataProvider>
        <ShopItem inactive={false} data={{ title: "Test" }} />
      </CartDataProvider>,
    );
    const input = screen.getByRole("spinbutton");

    await user.clear(input);
    await user.type(input, "3");
    expect(input).toHaveValue(3);
  });
});
