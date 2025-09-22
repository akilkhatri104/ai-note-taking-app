"use server";

import { getUser } from "@/app/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

type ErrorMessage = {
  errorMessage: string | null
}

export async function updateNoteAction(noteId: string, text: string) {
  try {
    const user = await getUser();
    if (!user) throw new Error("User must be logged in to update the note");

    await prisma.note.update({
      where: {
        id: noteId,
      },
      data: { text },
    });

    return { errorMessage: null };
  } catch (error) {
    handleError(error);
  }
}

export async function createNoteAction(noteId: string) {
  try {
    const user = await getUser();
    if (!user) throw new Error("User must be logged in to create new note");

    await prisma.note.create({
      data: {
        id: noteId,
        authorId: user.id,
        text: "",
      },
    });

    return { errorMessage: null };
  } catch (error) {
    handleError(error);
  }
}

export async function deleteNoteAction(noteId: string) {
  try {
    const user = await getUser();
    if (!user) throw new Error("User must be logged in to delete the note");

    await prisma.note.delete({
      where: {id:noteId,authorId: user.id}
    })

    return { errorMessage: null };
  } catch (error) {
    handleError(error);
  }
}
