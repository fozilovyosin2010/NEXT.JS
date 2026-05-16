"use server";

import { prisma } from "@/lib/prisma";
import { Idata } from "@/api/types.api";
import { revalidatePath } from "next/cache";

export const delData = async (id: string) => {
  try {
    await prisma.user.delete({
      where: { id },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};

export const postData = async (obj: Omit<Idata, "id">) => {
  try {
    await prisma.user.create({
      data: {
        name: obj.name,
        city: obj.city,
        job: obj.job,
        age: Number(obj.age),
        status: obj.status ?? true,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to create user:", error);
  }
};

export const putData = async (obj: Idata) => {
  try {
    const { id, ...data } = obj;
    await prisma.user.update({
      where: { id },
      data: {
        ...data,
        age: Number(data.age),
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to update user:", error);
  }
};
