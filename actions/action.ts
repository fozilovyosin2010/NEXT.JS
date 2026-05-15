"use server";

import { delUserData } from "@/api/users.api";
import { revalidatePath } from "next/cache";

export const delData = async (id: string) => {
  try {
    await delUserData(id);
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};
