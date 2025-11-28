import { describe, it, beforeEach, expect, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "@vitest/browser/context";
import type { Mock } from "vitest";
import useThemeStore from "../stores/ThemeStore";
import ThemeSwitcher from "../components/ThemeSwitcher";


// --- MOCKS -----------------------------------------------------

// mock matchMedia
beforeEach(() => {
  const mockedMatchMedia = vi.fn().mockImplementation((query) => ({
      matches: false, // default: prefers light
      media: query,
      onchange: null,
  })) as Mock;

    vi.stubGlobal("matchMedia", mockedMatchMedia);
  // reset localStorage
  localStorage.clear();

  // reset zustand store state
  useThemeStore.setState(useThemeStore.getInitialState());
});

// ---------------------------------------------------------------


describe("ThemeSwitcher", () => {
  it("renders with light theme icon by default", async () => {
    render(<ThemeSwitcher />);

    const button = page.getByRole("button");

    // The button should have an SVG icon inside
    //await expect.element(button).querySelector("svg")).toBeDefined();
    await expect.element(button).toBeVisible()
    await expect.element(button).toHaveAttribute("aria-label", "Switch to dark mode");
  });

  it("toggles theme when clicked", async () => {
    render(<ThemeSwitcher />);
    const button = page.getByRole("button");

    // Click → theme becomes dark
    await button.click();
    expect(useThemeStore.getState().theme).toBe("dark");
    await expect.element(button).toHaveAttribute("aria-label", "Switch to light mode");
    

    // Click again → theme swithces back to light
    await button.click();
    expect(useThemeStore.getState().theme).toBe("light");
    await expect.element(button).toHaveAttribute("aria-label", "Switch to dark mode");
  });
});