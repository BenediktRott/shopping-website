import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HorizontalPager } from "./HorizontalPager";
import userEvent from "@testing-library/user-event";

test("Renders correct slides", () => {
  render(
    <HorizontalPager>
      <h1>Slide 1</h1>
      <h1>Slide 2</h1>
      <h1>Slide 3</h1>
    </HorizontalPager>,
  );

  expect(screen.getByText("Slide 1")).toBeInTheDocument();
  expect(screen.getByText("Slide 2")).toBeInTheDocument();
  expect(screen.getByText("Slide 3")).toBeInTheDocument();
  expect(screen.queryByText("Slide 4")).not.toBeInTheDocument();
});

describe("Pagination Buttons", () => {
  test("Correct number of buttons", () => {
    render(
      <HorizontalPager>
        <h1>Slide 1</h1>
        <h1>Slide 2</h1>
        <h1>Slide 3</h1>
      </HorizontalPager>,
    );
    expect(screen.queryAllByRole("button").length).toBe(3);
  });

  test("Buttons initiate scroll", async () => {
    Element.prototype.scrollIntoView = vi.fn();
    const user = userEvent.setup();
    const { container } = render(
      <HorizontalPager>
        <h1>Slide 1</h1>
        <h1>Slide 2</h1>
        <h1>Slide 3</h1>
      </HorizontalPager>,
    );
    const track = container.querySelector('[class*="track"]');
    Object.defineProperty(track, "clientWidth", {
      value: 400,
      configurable: true,
    });

    Array.from(track.children).forEach((child, index) => {
      Object.defineProperty(child, "offsetLeft", {
        value: index * 320,
        configurable: true,
      });
      Object.defineProperty(child, "offsetWidth", {
        value: 320,
        configurable: true,
      });
    });

    const button = screen.getByRole("button", { name: /go to slide 2/i });
    await user.click(button);

    expect(track.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  });
});

describe("UI updates on scroll", () => {
  test("Updates after clicking pagination", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <HorizontalPager>
        <h1 key="1">Slide 1</h1>
        <h1 key="2">Slide 2</h1>
        <h1 key="3">Slide 3</h1>
      </HorizontalPager>,
    );
    const track = container.querySelector('[class*="track"]');
    Object.defineProperty(track, "clientWidth", {
      value: 400,
      configurable: true,
    });

    Array.from(track.children).forEach((child, index) => {
      Object.defineProperty(child, "offsetLeft", {
        value: index * 320,
        configurable: true,
      });
      Object.defineProperty(child, "offsetWidth", {
        value: 320,
        configurable: true,
      });
    });

    const dot2 = screen.queryByRole("button", { name: /go to slide 2/i });
    const dot1 = screen.queryByRole("button", { name: /go to slide 1/i });
    const slide1 = screen.getByRole("heading", {
      name: "Slide 1",
    }).parentElement;
    const slide2 = screen.getByRole("heading", {
      name: "Slide 2",
    }).parentElement;

    expect(slide1.className).toContain("active");

    Object.defineProperty(track, "scrollLeft", {
      value: 280,
      configurable: true,
    });

    fireEvent.scroll(track);

    expect(dot2.className).toContain("activeDot");
    expect(dot1.className).not.toContain("activeDot");
    expect(slide1.className).toContain("inactive");
    expect(slide2.className).toContain("active");
  });
});
