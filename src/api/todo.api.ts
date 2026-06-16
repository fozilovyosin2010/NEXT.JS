import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Idata } from "./type.api";

interface Iqueries {
  queryS: string;
  Qstatus: string;
}

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}` }),
  tagTypes: ["todo"],
  endpoints: (build) => ({
    getTodos: build.query<Idata[], Iqueries>({
      query: (queries) => `?name=${queries.queryS}&status=${queries.Qstatus}`,
      providesTags: ["todo"],
    }),
    delTodos: build.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
    editTodo: build.mutation({
      query: (obj: Idata) => ({
        url: `/${obj.id}`,
        method: "PUT",
        body: obj,
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});

export const { useGetTodosQuery, useDelTodosMutation, useEditTodoMutation } =
  todoApi;
