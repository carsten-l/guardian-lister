import { describe, it, expect } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "@vitest/browser/context";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "../../routeTree.gen";



describe("About route (browser)", () => {
  it("renders loader results correctly", async () => {
    // TanStack Router: build a router instance for this test
    const router = createRouter({ routeTree });

    // Navigate to the route we want to mount
    await router.navigate({ to: "/about" });

    // Render into real browser DOM
    render(<RouterProvider router={router} />);

    // --- Assertions ---
    await expect.element(page.getByText(/this is the about page/i)).toBeVisible();

  });
});
