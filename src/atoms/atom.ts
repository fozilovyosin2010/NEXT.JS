import { atom } from "jotai";
import { myAxios } from "../utils/api";
import { unwrap } from "jotai/utils";

export const trigger = atom(false);

export const openMod = atom(false);

export const inpS = atom("");

export const status = atom("");

const getTodosAsync = atom(async (get) => {
  get(trigger);
  try {
    if (inpS.toString().trim().length > 0) {
      const { data } = await myAxios.get(`/api/to-dos?query=${get(inpS)}`);
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

// ____________

const loading_state = { state: "loading", data: [] };
export const getTodos = unwrap(getTodosAsync, () => loading_state);
