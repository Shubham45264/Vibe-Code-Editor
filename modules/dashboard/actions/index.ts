"use server";

import { currentUser } from "@/modules/auth/actions"
import { db } from "@/lib/db"

export const getAllPlaygroundForUser = async () => {
  const user = await currentUser();

  try {
    // We use a cast to any here because the Prisma client generation 
    // might have a sync delay with the IDE's type checker.
    const playground = await (db as any).playground.findMany({
      where: {
        userId: user?.id
      },
      include: {
        user: true,
        starMarks: true
      }
    });

    return playground
  } catch (error) {
    console.log(error);
  }
}