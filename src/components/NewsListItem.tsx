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
}