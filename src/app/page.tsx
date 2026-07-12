import { createBookmark, deleteBookmark, getBookmarks } from "@/lib/actions";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const bookmarks = await getBookmarks(q);

  async function deleteBookmarkAction(formData: FormData) {
    "use server";
    await deleteBookmark(Number(formData.get("id")));
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 font-sans">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Bookmark Manager
      </h1>

      <form action="/" className="mt-6 flex gap-2">
        <input
          type="text"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Search bookmarks..."
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
        />
        <button
          type="submit"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white dark:bg-gray-100 dark:text-gray-900"
        >
          Search
        </button>
      </form>

      <form
        action={createBookmark}
        className="mt-6 grid grid-cols-1 gap-2 rounded-md border border-gray-200 p-4 dark:border-gray-800"
      >
        <input
          type="url"
          name="url"
          placeholder="https://example.com"
          required
          className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
        />
        <input
          type="text"
          name="description"
          placeholder="Description (optional)"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags, comma-separated (optional)"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
        />
        <button
          type="submit"
          className="mt-1 rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
        >
          Add bookmark
        </button>
      </form>

      <ul className="mt-8 flex flex-col gap-3">
        {bookmarks.length === 0 && (
          <li className="text-sm text-gray-500">No bookmarks found.</li>
        )}
        {bookmarks.map((bookmark) => (
          <li
            key={bookmark.id}
            className="flex items-start justify-between gap-4 rounded-md border border-gray-200 p-4 dark:border-gray-800"
          >
            <div>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                {bookmark.title}
              </a>
              <p className="text-xs text-gray-500">{bookmark.url}</p>
              {bookmark.description && (
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  {bookmark.description}
                </p>
              )}
              {bookmark.tags && (
                <p className="mt-1 text-xs text-gray-400">{bookmark.tags}</p>
              )}
            </div>
            <form action={deleteBookmarkAction}>
              <input type="hidden" name="id" value={bookmark.id} />
              <button
                type="submit"
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
