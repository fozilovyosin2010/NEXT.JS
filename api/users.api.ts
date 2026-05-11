import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./types.api";

const api = "http://localhost:3000/users";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], string>({
      // here is query(params)
      query: (name) => `?fullName:contains=${name}&email:contains=${name}`,
      providesTags: ["Users"],
    }),

    getUserById: builder.query<User, string>({
      query: (id) => `/${id}`,
      providesTags: ["Users"],
    }),

    delData: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    addData: builder.mutation({
      query: (obj: User) => ({
        url: "/",
        method: "POST",
        body: obj,
      }),
      invalidatesTags: ["Users"],
    }),
    editData: builder.mutation({
      query: ({ id, ...obj }: { id: string; obj: User }) => ({
        url: `/${id}`,
        method: "PUT",
        body: obj,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useDelDataMutation,
  useAddDataMutation,
  useEditDataMutation,
} = usersApi;
