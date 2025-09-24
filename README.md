# CodeBurry

A Vite + React (TypeScript) app with an Express/MongoDB backend and Socket.IO real-time features.

## Requirements
- Node.js 18+ (recommended 20+)
- npm 9+
- MongoDB (local or Atlas)

## Quick Start
```bash
# 1) Install deps
npm install

# 2) Start client and server together (concurrently)
npm run dev
# Client: http://localhost:5173
# API:    http://localhost:4000
```

## Scripts
- `npm run dev`: Runs Vite dev server and Node backend via nodemon
- `npm run dev:client`: Runs only the Vite dev server
- `npm run dev:server`: Runs only the Express server (with nodemon)
- `npm run build`: Builds the client for production
- `npm run preview`: Serves the client build locally
- `npm run lint`: Lints the project

## Environment Variables
Create a `.env` file in the project root (used by the backend via `dotenv`).

```bash
# Mongo connection (defaults to mongodb://127.0.0.1:27017/codeburry if unset)
MONGODB_URI=mongodb://127.0.0.1:27017/codeburry

# JWT secret for signing auth tokens (use a strong value in production)
JWT_SECRET=change-me

# Optional: override API port (default 4000)
PORT=4000
```

Notes:
- The Vite dev server proxies `/api` requests to the backend at `http://localhost:4000` (see `vite.config.ts`).
- Cookies are issued with `sameSite=lax` and `secure=false` in development.

## Project Structure
```
server/
  middleware/
  models/
  routes/
  server.js        # Express + Socket.IO + Mongo + auth endpoints
src/
  components/      # UI components (auth, community, gamification, etc.)
  context/         # React contexts for auth/user
  pages/           # Route-level pages
  main.tsx, App.tsx
```

## Backend Overview
- Auth endpoints: register, login, logout, me
- Admin endpoints: users, stats, ping (protected with role checks)
- Community routes: real-time features via Socket.IO under `/api/community`

Default ports:
- Client: `5173`
- API: `4000`

## Development Tips
- Ensure MongoDB is running and `MONGODB_URI` is reachable before `npm run dev`.
- For an admin user in dev, register with an email starting with `admin@` (role becomes `admin`).

## Building and Previewing Client
```bash
npm run build
npm run preview
# Preview served on http://localhost:4173 by default
```

## License
MIT
