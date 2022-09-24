import React, { useEffect, useState } from "react";
import { RepoCard } from "../components/RepoCard";
import { useDebounce } from "../hooks/debounde";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";

const HomePage: React.FC = () => {
  const [q, setQ] = useState<string>("");
  const [dropdown, setDropdown] = useState(false);

  const debounced = useDebounce(q, 300);
  const { isLoading, isError, data } = useSearchUsersQuery(
    {
      q: debounced,
      per_page: 10,
    },
    { skip: debounced.length < 3, refetchOnFocus: true }
  );

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };

  return (
    <div className="flex justify-center w-screen h-screen pt-10 mx-auto">
      {isError && (
        <p className="text-center text-red-600">Something went wrong</p>
      )}

      <div className="relative w-[560px]">
        <input
          className="px-4 py-2 border w-full mb-2 h-[42px]"
          type="text"
          placeholder="search for github user"
          onChange={(e) => setQ(e.target.value)}
        />

        {dropdown && (
          <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
            {isLoading && <p className="text-center">Loading...</p>}

            {data?.map((user) => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className="px-4 py-2 transition-colors cursor-pointer hover:bg-gray-500 hover:text-white"
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}

        <div className="container">
          {areReposLoading && (
            <p className="text-center">Repos are loading...</p>
          )}
          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
