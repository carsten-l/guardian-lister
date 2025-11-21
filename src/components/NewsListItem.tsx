import { type NewsItem } from "../types";

export default function NewsListItem({ item }: { item: NewsItem }) {
  return (
    <li key={item.id} className="mb-4 border p-4 space-y-2">
      <p className="text-xs font-black text-gray-500 dark:text-gray-300 tracking-widest uppercase">{item.sectionName}</p>
      <h2 className="text-balance">{item.webTitle}</h2>
      <p className="text-sm">{ new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit"
      } ).format(new Date(item.webPublicationDate))}</p>
    </li>
  );
}