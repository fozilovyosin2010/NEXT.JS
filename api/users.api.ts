import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Idata } from "./types.api";

const api = "http://localhost:3000/users";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    //   there 2 types of requests: query(GET) and mutation(POST, DELETE, PUT, PATCH)
    getUsers: builder.query<Idata[], string>({
      // here is query(params)
      query: (name) => `?name=${name}`,
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
