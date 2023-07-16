"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export const updateUser = async (formData: FormData) => {
  const id = formData.get("_id");
  const name = formData.get("name");
  const email = formData.get("email");
  const image = formData.get("image");

  try {
    await prisma.user.update({
      where: {
        id: id?.toString(),
      },
      data: {
        name: name?.toString(),
        email: email?.toString(),
        image: image?.toString(),
      },
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/settings");
};
