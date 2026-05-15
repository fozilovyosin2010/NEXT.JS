"use server";

import { Idata } from "@/api/types.api";
import { delUserData, postUserData, putUserData } from "@/api/users.api";
import { revalidatePath } from "next/cache";

export const delData = async (id: string) => {
  try {
    await delUserData(id);
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};

export const postData = async (obj: Idata) => {
  try {
    await postUserData(obj);
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};

export const putData = async (obj: Idata) => {
  try {
    await putUserData(obj);
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};
