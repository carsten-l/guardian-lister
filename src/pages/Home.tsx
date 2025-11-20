import axios from "axios";
import { useState, useEffect } from "react";
import { type NewsItem } from "../lib/types.js";
import NewsListItem from "../components/NewsListItem.js";

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
      
      <h1 className="text-2xl font-bold">Welcome to the Guardian Article Lister!</h1>

        <ul className="mt-12"> 
        {data && data.map((item) => (
            <NewsListItem key={item.id} item={item} />
            
        ))}
        </ul>
                

    </>
  );
}