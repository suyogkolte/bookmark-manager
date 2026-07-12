"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getBookmarks(query?: string) {
  const search = query?.trim();

  return prisma.bookmark.findMany({
    where: search
      ? {
          OR: [
            { title: { contains: search } },
            { url: { contains: search } },
            { tags: { contains: search } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function createBookmark(formData: FormData) {
  const url = String(formData.get("url") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const tags = String(formData.get("tags") ?? "").trim();

  if (!url || !title) {
    throw new Error("URL and title are required");
  }

  await prisma.bookmark.create({
    data: { url, title, description: description || null, tags },
  });

  revalidatePath("/");
}

export async function deleteBookmark(id: number) {
  await prisma.bookmark.delete({ where: { id } });
  revalidatePath("/");
}
