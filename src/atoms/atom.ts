import { atom } from "jotai";
import { myAxios } from "../utils/api";
import { unwrap } from "jotai/utils";
import { Idata } from "./types.atom";

export const trigger = atom(false);

export const openMod = atom(false);

export const inpS = atom("");

export const status = atom("");

const getTodosAsync = atom(async (get) => {
  get(trigger);
  try {
    if (get(inpS).trim().length > 0) {
      const { data } = await myAxios.get(
        `/api/to-dos?query=${get(inpS).trim()}`,
      );
      return data.data;
    } else {
      const { data } = await myAxios.get(`/api/to-dos`);
      return data.data;
    }
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

export const triggerId = atom(false);
export const infoIdx = atom<number | null>(null);

export const getTodoById = atom(async (get) => {
  get(triggerId);

  const id = get(infoIdx);
  try {
    if (id !== null) {
      const { data } = await myAxios.get(`/api/to-dos/${id}`);
      return data.data;
    }

    // set(objInfo, data.data);
  } catch (error) {
    console.error(error);
  }
});

export const delById = atom(null, async (get, set, id) => {
  try {
    await myAxios.delete(`/api/to-dos/images/${id}`);
    set(triggerId, !get(triggerId));
  } catch (error) {
    console.error(error);
  }
});

export const postMod = atom(false);
export const postById = atom(null, async (get, set, id, obj) => {
  get(triggerId);
  try {
    await myAxios.post(`/api/to-dos/${id}/images`, obj);
    set(triggerId, !get(triggerId));
  } catch (error) {
    console.error(error);
  }
});

// ____________

const loading_state = { state: "loading", data: [] };
export const getTodos = unwrap(getTodosAsync, () => loading_state);
