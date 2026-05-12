import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Idata } from "./types.api";

import axios from "axios";

const api = "https://667ab3c9bd627f0dcc90219a.mockapi.io/addTocart";

const myAxios = axios.create({ baseURL: api });

export const getUserData = async (q: string = "") => {
  const { data } = await myAxios.get(`?name=${q.trim()}`);
  return data;
};

export const postUserData = async (obj: Idata) => {
  return await myAxios.post("/", obj);
};

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  // to show how many tags exist. v use tags(providesTags(query), invalidatesTags(mutation)) to track changes,
  // if mutation-request is used then it means that the sever is update and v need to refetch
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    //   there 2 types of requests: query(GET) and mutation(POST, DELETE, PUT, PATCH)
    getUsers: builder.query<Idata[], string>({
      // here is query(params)
      query: (name) => `?name=${name}`,
      providesTags: ["Users"],
    }),

    addUser: builder.mutation({
      query: (obj) => ({
        url: "/",
        method: "POST",
        body: obj,
      }),

      invalidatesTags: ["Users"],
    }),

    delUser: builder.mutation<Omit<Idata, "id" | "status">, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      // track changes
      invalidatesTags: ["Users"],
    }),

    editUser: builder.mutation<Omit<Idata, "id" | "status">, Idata>({
      query: ({ id, ...obj }) => ({
        url: `/${id}`,
        method: "PUT",
        body: obj,
      }),
      invalidatesTags: ["Users"],
    }),
    // !here search
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUsersQuery,
  useDelUserMutation,
  useAddUserMutation,
  useEditUserMutation,
} = usersApi;
