import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Idata } from "./types.api";

const api = "https://667ab3c9bd627f0dcc90219a.mockapi.io/addTocart";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  endpoints: (builder) => ({
    //   there 2 types of requests: query(GET) and mutation(POST, DELETE, PUT, PATCH)
    getUsers: builder.query<Idata[], string>({
      // here is query(params for search)
      query: (name) => ``,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery } = usersApi;
