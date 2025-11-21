import { type NewsItem } from "../types";

export default function NewsListItem({ item }: { item: NewsItem }) {
  return (
    <li key={item.id} className="mb-4 border border-neutral-400 p-4 space-y-2">
      <p className="text-xs font-bold text-neutral-400 dark:text-neutral-200 tracking-[2px] uppercase">
        {item.pillarName !== item.sectionName 
          ? `${item.pillarName} ● ${item.sectionName}` 
          : item.sectionName
        }
      </p>
      <h2 className="text-balance">{item.webTitle}</h2>
      <p className="text-sm">{ new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit"
      } ).format(new Date(item.webPublicationDate))}</p>
    </li>
  );
    return (
        <div className="border border-gray-300 rounded p-4 dark:border-gray-600 shadow-sm space-y-2">
            <p className="text-xs font-black text-gray-500 dark:text-gray-300 tracking-[4px] uppercase">
                {item.sectionName}
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
