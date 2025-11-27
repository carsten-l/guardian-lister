import { render } from "vitest-browser-react";
import { page } from "@vitest/browser/context";
import { describe, it, expect } from "vitest";
import NewsListItem from "../components/NewsListItem";

describe("NewsListItem", () => {
    const mockNewsItem = {
        id: "test-id-123",
        webTitle: "Test Article Title",
        pillarName: "News",
        sectionName: "World News",
        webPublicationDate: "2020-01-30T10:00:00Z",
    };

    it("renders article title", async () => {
        render(<NewsListItem item={mockNewsItem} />);

        await expect
            .element(page.getByRole("heading", { name: /test article title/i }))
            .toBeInTheDocument();
    });

    it("renders section information when pillar and section are different", async () => {
        render(<NewsListItem item={mockNewsItem} />);

        await expect
            .element(page.getByText(/news • world news/i))
            .toBeVisible();
    });

    it("renders only section name when pillar and section are the same", async () => {
        const sameNameItem = {
            ...mockNewsItem,
            pillarName: "Sport",
            sectionName: "Sport",
        };

        render(<NewsListItem item={sameNameItem} />);

        await expect.element(page.getByText(/^sport$/i)).toBeVisible();
    });

    it("renders formatted publication date", async () => {
        render(<NewsListItem item={mockNewsItem} />);

        await expect.element(page.getByText(/january 30, 2020/i)).toBeVisible();
    });

    it("renders as an article element", async () => {
        render(<NewsListItem item={mockNewsItem} />);

        const article = page.getByRole("article");
        await expect.element(article).toBeInTheDocument();
    });

    it("displays all required content sections", async () => {
        render(<NewsListItem item={mockNewsItem} />);

        await expect
            .element(page.getByText(/news • world news/i))
            .toBeVisible();
        await expect
            .element(page.getByRole("heading", { name: /test article title/i }))
            .toBeVisible();
        await expect.element(page.getByText(/january 30, 2020/i)).toBeVisible();
    });
});
