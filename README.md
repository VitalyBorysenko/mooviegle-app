# Mooviegle App

Angular 22 movie catalog app using TMDB API and Firebase REST auth/collection.

## Requirements

- Node.js >= 22.12.0
- npm >= 10

## Setup

```bash
npm install
cp src/environments/environment.example.ts src/environments/environment.ts
cp src/environments/environment.example.ts src/environments/environment.prod.ts
```

Update API keys in both environment files. See [`firebase/README.md`](firebase/README.md) for Firebase setup.

## Development

```bash
npm start
```

Open `http://localhost:4200/`.

## Build

```bash
npm run build
```

Production output is written to `dist/mooviegle-app/browser`.

## Tests

```bash
npm test
```

## Lint / Format

```bash
npm run lint
npm run format
```

## Architecture

- `src/app/client` — UI shell, pages, modals
- `src/app/services/tmdb.service.ts` — TMDB API
- `src/app/auth` — Firebase REST auth + auth state/guard
- `src/app/shared` — reusable movie slider and TMDB poster pipe
- `src/app/core/interceptors` — Firebase auth token injection

## Notes

- Local environment files are gitignored; use `environment.example.ts` as template.
- Original Firebase RTDB project may return `423 Locked`; configure a new Firebase project to restore collection/login.
