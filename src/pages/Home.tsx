import axios from "axios";
import { useState, useEffect } from "react";

type NewsItem = {
    id: string;
    webTitle: string;
    webPublicationDate: string;
    sectionName: string;
}

export default function Home() {
    const [data, setData] = useState<NewsItem[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    axios.get(`https://content.guardianapis.com/search?page-size=50&api-key=${import.meta.env.VITE_GUARDIAN_API_KEY}`)
            .then((response) => {
                console.log(response.data.response.results);
                setData(response.data.response.results);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div className="p-8 border-2 border-red-700 text-red-700">Error!!!</div>;
    }
    
    return (
    <>
      <h1>Home Page</h1>
      <p>Welcome to the Guardian Article Lister!</p>

        <ul className="mt-12"> 
        {data && data.map((item) => (
            <li key={item.id} className="mb-4 border p-4 space-y-2">
                <p className="text-xs font-black text-gray-500 tracking-widest uppercase">{item.sectionName}</p>
                <h2 >{item.webTitle}</h2>
                <p className="text-sm">{ new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                } ).format(new Date(item.webPublicationDate))}</p>
                </li>
        ))}
        </ul>
                

    </>
  );
}