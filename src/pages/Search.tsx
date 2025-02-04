import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addToFavorites } from "../redux/movieSlice";
import { AppDispatch } from "../redux/Store";

type SearchResult = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
};

const SearchPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");
  const [results, setResults] = useState<SearchResult[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (query) {
      fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}&api_key=8e79ce40aad9453d489a602e695e1423`
      )
        .then((res) => res.json())
        .then((data) => {
          setResults(data.results);
        })
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-6 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((item) => (
            <div key={item.id} className="bg-neutral-700 rounded-lg p-4 shadow-md">
              {item.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full h-auto rounded-md mb-2"
                />
              )}
              <h3 className="text-lg font-semibold">{item.title || item.name}</h3>
              <div className="flex justify-between mt-5 mb-2">
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  

                  onClick={() => {
                      dispatch(
                        addToFavorites({
                          id: item.id,
                          title: item.title || item.name || "Untitled",
                          poster_path: item.poster_path || "",
                          overview: "No overview available", // Provide a default overview
                        })
                      );
                      alert('The movie has been added to your favorites');
                    }}

                >
                  Favorite ❤️
                </button>
                <Link
                  to={`/movie/${item.id}`}
                  className="bg-green-500 text-white px-4 py-1 rounded"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
