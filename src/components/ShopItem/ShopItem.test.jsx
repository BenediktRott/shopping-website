import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { ShopItem } from "./ShopItem";
import userEvent from "@testing-library/user-event";

describe("Counter", () => {
  test("can type", async () => {
    render(<ShopItem inactive={false} data={{ title: "Test" }} />);
    const input = screen.getByRole("spinbutton");
    const user = userEvent.setup();

    await user.clear(input);
    await user.type(input, "3");
    expect(input).toHaveValue(3);
  });

  test("increase/decrease button", async () => {
    render(<ShopItem inactive={false} data={{ title: "Test" }} />);
    const user = userEvent.setup();
    const addButton = screen.getByRole("button", { name: "+" });
    const subtractButton = screen.getByRole("button", { name: "-" });
    const input = screen.getByRole("spinbutton");

    await user.click(addButton);
    expect(input).toHaveValue(2);
    await user.click(subtractButton);
    expect(input).toHaveValue(1);
  });

  test("inactive button", async () => {
    render(<ShopItem inactive={true} data={{ title: "Test" }} />);
    const user = userEvent.setup();
    const addButton = screen.getByRole("button", { name: "+" });
    const subtractButton = screen.getByRole("button", { name: "-" });
    const input = screen.getByRole("spinbutton");

    await user.click(addButton);
    expect(input).toHaveValue(1);
    await user.click(subtractButton);
    expect(input).toHaveValue(1);
  });
});
