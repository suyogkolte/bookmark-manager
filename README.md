# bookmark-manager

A portal where you save, organize, and search links.

## Features

- Add bookmarks with a URL, title, optional description, and comma-separated tags
- Search bookmarks by title, URL, or tags
- Delete bookmarks
- Data persists locally via SQLite

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [Prisma](https://www.prisma.io) ORM + SQLite

## Prerequisites

- Node.js 20+ (managed via [nvm](https://github.com/nvm-sh/nvm) recommended)

## Getting started

```bash
git clone https://github.com/suyogkolte/bookmark-manager.git
cd bookmark-manager
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |
| `npx prisma migrate dev` | Apply database migrations |
| `npx prisma studio` | Browse the database in a GUI |

## Database

Bookmarks are stored in a local SQLite file (`prisma/dev.db`, gitignored). Schema is defined in [`prisma/schema.prisma`](prisma/schema.prisma).

## Contributing

`main` is a protected branch — changes go through a pull request from a feature branch:

```bash
git checkout -b feature/short-name
# make changes, commit
git push -u origin feature/short-name
# open a PR into main
```
