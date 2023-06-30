"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateUser = async (formData: FormData) => {
  const id = formData.get("_id");
  const name = formData.get("name");
  const email = formData.get("email");

  try {
    await prisma.user.update({
      where: {
        id: id?.toString(),
      },
      data: {
        name: name?.toString(),
        email: email?.toString(),
      },
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/settings");
};