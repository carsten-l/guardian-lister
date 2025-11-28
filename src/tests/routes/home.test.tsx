import { describe, it, expect, vi, afterEach } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "@vitest/browser/context";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "../../routeTree.gen";



// Mock the entire service module
vi.mock("../services/theGuardian", () => ({
  fetchGuardianArticles: vi.fn().mockResolvedValue([
      {
                id: "article-1",
                webTitle: "Test Article 1",
                webPublicationDate: "2025-11-26T10:00:00Z",
                sectionName: "Technology",
                pillarName: "News",
            },
  ]),
}));

vi.mock("../utils/formatDate", () => ({
  formatDate: () => "January 30, 2020",
}));

afterEach(() => {
  vi.clearAllMocks();
});


describe("Index route (browser)", () => {
  it("renders loader results correctly", async () => {
    // TanStack Router: build a router instance for this test
    const router = createRouter({ routeTree });

    // Navigate to the route we want to mount
    await router.navigate({ to: "/" });

    // Render into real browser DOM
    render(<RouterProvider router={router} />);

    // --- Assertions ---
    await expect.element(page.getByText(/Welcome to the Guardian Article Lister!/i)).toBeVisible();
    await expect.element(page.getByText(/Test Article 1/i)).toBeVisible();
    await expect.element(page.getByText(/News • Technology/i)).toBeVisible();
    await expect.element(page.getByText(/January 30, 2020/i)).toBeVisible();
    
  });
});
