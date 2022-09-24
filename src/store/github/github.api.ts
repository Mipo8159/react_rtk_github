import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ServerResponseInterface,
  UserInterface,
} from "../../interfaces/item.interface";
import { RepoInterface } from "../../interfaces/repo.interface";

export const githubApi = createApi({
  reducerPath: "github/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com",
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    // search users
    searchUsers: build.query<UserInterface[], { q: string; per_page: number }>({
      query: (search: { q: string; per_page: number }) => ({
        url: "search/users",
        params: {
          q: search.q,
          per_page: search.per_page,
        },
      }),
      transformResponse: (res: ServerResponseInterface<UserInterface>) =>
        res.items,
    }),

    // search repos
    getUserRepos: build.query<RepoInterface[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`,
      }),
    }),
  }),
});

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi;
