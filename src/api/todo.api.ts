import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Idata } from "./type.api";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/` }),
  endpoints: (build) => ({
    getTodos: build.query<Idata[], string>({
      query: (name: string) => `?name=${name}`,
    }),
  }),
});

export const { useGetTodosQuery } = todoApi;
