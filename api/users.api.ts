import { Idata } from "@/api/types.api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const putUserData = async ({ id, ...obj }: Idata) => {
  return await myAxios.put(`/${id}`, obj);
};

export const delUserData = async (id: string) => {
  return await myAxios.delete(`/${id}`);
};

export const getById = async (id: string) => {
  const { data } = await myAxios.get(`/${id}`);
  return data;
};
