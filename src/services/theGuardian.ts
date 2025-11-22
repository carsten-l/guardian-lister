import { apiClient } from "../lib/apiClient";
import { type GuardianApiResponse } from "../types";

export async function fetchGuardianArticles(pageSize = 200) {
    const { data } = await apiClient.get<GuardianApiResponse>("/search", {
        params: { "page-size": pageSize },
    });
    const results = data.response.results;
    if (!results) {
        throw new Error("Invalid API response");
    }
    return results;
}
