import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { type NewsItem } from "../lib/types.js";
import NewsListItem from "../components/NewsListItem.js";

export const Route = createFileRoute("/")({
    component: Index,
    loader: async () => {
        const response = await axios.get(
            `https://content.guardianapis.com/search?page-size=50&api-key=${import.meta.env.VITE_GUARDIAN_API_KEY}`,
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
