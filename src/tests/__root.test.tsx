import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "@vitest/browser/context";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import type { Mock } from "vitest";

beforeEach(() => {
  const mockedMatchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
  })) as Mock;

  vi.stubGlobal("matchMedia", mockedMatchMedia);
  localStorage.clear();
});

describe("Root Layout", () => {
  it("renders navigation with all links", async () => {
    const router = createRouter({ routeTree });
    await router.navigate({ to: "/" });
    render(<RouterProvider router={router} />);

    await expect.element(page.getByRole("link", { name: /home/i })).toBeVisible();
    await expect.element(page.getByRole("link", { name: /about/i })).toBeVisible();
    await expect.element(page.getByRole("link", { name: /contact/i })).toBeVisible();
  });

  it("renders theme switcher", async () => {
    const router = createRouter({ routeTree });
    await router.navigate({ to: "/" });
    render(<RouterProvider router={router} />);

    const themeSwitcher = page.getByRole("button");
    await expect.element(themeSwitcher).toBeVisible();
  });

  it("navigates between routes", async () => {
    const router = createRouter({ routeTree });
    await router.navigate({ to: "/" });
    render(<RouterProvider router={router} />);

    // Click About link
    await page.getByRole("link", { name: /about/i }).click();
    await expect.element(page.getByText(/this is the about page/i)).toBeVisible();

    // Click Contact link
    await page.getByRole("link", { name: /contact/i }).click();
    await expect.element(page.getByText(/contact us/i)).toBeVisible();
  });
});