import { atom } from "jotai";
import { myAxios } from "../utils/api";
import { unwrap } from "jotai/utils";
import { Idata } from "./types.atom";

export const trigger = atom(false);

export const openMod = atom(false);

const getTodosAsync = atom(async (get) => {
  get(trigger);
  try {
    const { data } = await myAxios.get(`/api/to-dos`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
});

export const delTodo = atom(null, async (get, set, id: number) => {
  try {
    await myAxios.delete(`/api/to-dos?id=${id}`);
    set(trigger, !get(trigger));
  } catch (error) {
    console.error(error);
  }
});

export const checkTodo = atom(null, async (get, set, id: number) => {
  try {
    await myAxios.put(`completed?id=${id}`);

    set(trigger, !get(trigger));
  } catch (error) {
    console.error(error);
  }
});

export const postTodo = atom(null, async (get, set, obj: FormData) => {
  try {
    await myAxios.post(`/api/to-dos`, obj);

    set(trigger, !get(trigger));
  } catch (error) {
    console.error(error);
  }
});
export const putTodo = atom(null, async (get, set, obj: FormData) => {
  try {
    await myAxios.put(`/api/to-dos`, obj);

    set(trigger, !get(trigger));
  } catch (error) {
    console.error(error);
  }
});

// ____________

const loading_state = { state: "loading", data: [] };
export const getTodos = unwrap(getTodosAsync, () => loading_state);
