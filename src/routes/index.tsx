import { createFileRoute } from "@tanstack/react-router";
import { apiClient } from "../lib/apiClient";
import { type NewsItem } from "../types";
import NewsListItem from "../components/NewsListItem";

export const Route = createFileRoute("/")({
    component: Index,
    loader: async () => {
        const response = await apiClient.get("/search",
        { params: { "page-size": 50 } }
        );
        return response.data.response.results;
    },
    staleTime: 1000 * 60, // 1 minute
});
function Index() {
    const items = Route.useLoaderData() as NewsItem[];

    return (
        <>
            <h1 className="text-2xl font-bold">
                Welcome to the Guardian Article Lister!
            </h1>

            <ul className="mt-12">
                {items &&
                    items.map((item) => (
                        <NewsListItem key={item.id} item={item} />
                    ))}
            </ul>
        </>
    );
}
