import axios, { create } from "axios";
import { Idata } from "./types.api";
export const api = "https://667ab3c9bd627f0dcc90219a.mockapi.io/addTocart";

export const myAxios = create({
  baseURL: api,
});

export async function getUserById(id: string) {
  const { data } = await myAxios.get(`/${id}`);
  return data;
}

export async function getUsersData() {
  const { data } = await myAxios.get("/");
  return data;
}

export async function delUsersData(id: string) {
  return await myAxios.delete(`/${id}`);
}

export async function postUsersData(obj: Idata) {
  await myAxios.post("/", obj);
}

export async function putUsersData(obj: Idata) {
  await myAxios.put(`/${obj.id}`, obj);
}
