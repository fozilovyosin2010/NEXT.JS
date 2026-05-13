import { Idata } from "@/api/types.api";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "axios";

const api = "https://667ab3c9bd627f0dcc90219a.mockapi.io/addTocart";

const myAxios = axios.create({ baseURL: api });

export const usegetUserDataQuery = (q: string) => {
  return useQuery({
    queryKey: ["Users", q],
    queryFn: () => getUserData(q),
  });
};

export const usePostUserDataMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (obj: Idata) => postUserData(obj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
  });
};
export const usePutUserDataMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (obj: Idata) => putUserData(obj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
  });
};
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
