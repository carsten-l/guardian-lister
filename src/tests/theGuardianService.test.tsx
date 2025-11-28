import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchGuardianArticles } from "../services/theGuardian";
import { apiClient } from "../lib/apiClient";
import type { GuardianApiResponse } from "../types";

// Mock the apiClient module
vi.mock("../lib/apiClient");

describe("fetchGuardianArticles", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("calls apiClient with correct params and returns results", async () => {
        const mockResponse: GuardianApiResponse = {
            response: {
                status: "ok",
                userTier: "developer",
                total: 2,
                startIndex: 1,
                pageSize: 200,
                currentPage: 1,
                pages: 1,
                orderBy: "newest",
                results: [
                    {
                        id: "article-1",
                        webTitle: "Test Article 1",
                        webPublicationDate: "2025-11-26T10:00:00Z",
                        sectionName: "Technology",
                        pillarName: "News",
                    },
                    {
                        id: "article-2",
                        webTitle: "Test Article 2",
                        webPublicationDate: "2025-11-27T10:00:00Z",
                        sectionName: "Politics",
                        pillarName: "News",
                    },
                ],
            },
        };

        vi.mocked(apiClient.get).mockResolvedValue({ data: mockResponse });

        const results = await fetchGuardianArticles();

        expect(apiClient.get).toHaveBeenCalledWith("/search", {
            params: { "page-size": 200 },
        });
        expect(results).toEqual(mockResponse.response.results);
        expect(results).toHaveLength(2);
    });

    it("uses custom page size when provided", async () => {
        const mockResponse: GuardianApiResponse = {
            response: {
                status: "ok",
                userTier: "developer",
                total: 0,
                startIndex: 1,
                pageSize: 50,
                currentPage: 1,
                pages: 1,
                orderBy: "newest",
                results: [],
            },
        };

        vi.mocked(apiClient.get).mockResolvedValue({ data: mockResponse });

        await fetchGuardianArticles(50);

        expect(apiClient.get).toHaveBeenCalledWith("/search", {
            params: { "page-size": 50 },
        });
    });

    it("throws error when results are missing", async () => {
        const mockResponse = {
            response: {},
        };

        vi.mocked(apiClient.get).mockResolvedValue({ data: mockResponse });

        await expect(fetchGuardianArticles()).rejects.toThrow("Invalid API response");
    });

    it("propagates errors from apiClient", async () => {
        const error = new Error("Network error");
        vi.mocked(apiClient.get).mockRejectedValue(error);

        await expect(fetchGuardianArticles()).rejects.toThrow("Network error");
    });
});