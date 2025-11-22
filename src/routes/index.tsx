import { createFileRoute } from "@tanstack/react-router";
import NewsListItem from "../components/NewsListItem";
import { fetchGuardianArticles } from "../services/theGuardian";

export const Route = createFileRoute("/")({
    component: Index,
    loader: () => fetchGuardianArticles(),
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
