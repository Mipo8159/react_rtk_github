import React, { useState } from "react";
import { useActions, useAppSelector } from "../hooks/redux";
import { RepoInterface } from "../interfaces/repo.interface";

interface RepoCardProps {
  repo: RepoInterface;
}
export const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  const { addFavourite, removeFavourite } = useActions();
  const { favourites } = useAppSelector((state) => state.github);
  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));

  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavourite(repo.html_url);
    setIsFav(true);
  };

  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavourite(repo.html_url);
    setIsFav(false);
  };

  return (
    <div className="px-5 py-3 mb-2 transition-all border rounded hover:shadow-md hover:bg-gray-100">
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="mr-2 font-bold">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>

        {!isFav && (
          <button
            className="px-4 py-2 mr-2 transition-all bg-yellow-400 rounded hover:shadow-md"
            onClick={addToFavourite}
          >
            Add
          </button>
        )}

        {isFav && (
          <button
            className="px-4 py-2 transition-all bg-red-400 rounded hover:shadow-md"
            onClick={removeFromFavourite}
          >
            Remove
          </button>
        )}
      </a>
    </div>
  );
};
