import { type NewsItem } from "../types";

export default function NewsListItem({ item }: { item: NewsItem }) {
    return (
        <div className="border border-gray-300 rounded p-4 dark:border-gray-600 shadow-sm space-y-2">
            <p className="text-xs font-black text-gray-500 dark:text-gray-300 tracking-[4px] uppercase">
                {item.pillarName !== item.sectionName
                    ? `${item.pillarName} ● ${item.sectionName}`
                    : item.sectionName}
            </p>
            <h2 className="text-balance">{item.webTitle}</h2>
            <p className="text-sm">
                {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                }).format(new Date(item.webPublicationDate))}
            </p>
        </div>
    );
}
