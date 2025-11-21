import { createFileRoute } from "@tanstack/react-router";
import { apiClient } from "../lib/apiClient";
import { type GuardianApiResponse } from "../types";
import NewsListItem from "../components/NewsListItem";

export const Route = createFileRoute("/")({
    component: Index,
    loader: async () => {
        const { data } = await apiClient.get<GuardianApiResponse>("/search",
        { params: { "page-size": 200 } }
        );
        if (!data?.response?.results) {
            throw new Error("Invalid API response");
        }
        return data.response.results;
    },
    staleTime: 1000 * 60, // 1 minute
});
function Index() {
    const items = Route.useLoaderData();
    console.log(items);

    return (
        <>
            <h1 className="text-2xl font-bold text-balance">
                Welcome to the Guardian Article Lister!
            </h1>

            <div className="mt-12 space-y-4">
                {items &&
                    items.map((item) => (
                        <NewsListItem key={item.id} item={item} />
                    ))}
            </div>
        </>
    );
}
