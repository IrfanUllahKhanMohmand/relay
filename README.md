# Relay

Create a room, invite people in, and chat while you can see who is online.

Flutter client with a Node.js API. Docker Compose can start Mongo beside the API.

## Run

API:

```bash
cd apps/api
cp .env.example .env
npm install
npm run dev
```

API + Mongo:

```bash
docker compose up --build
```

Mobile (iOS, Android, or web):

```bash
cd apps/mobile
flutter pub get
flutter run
```

## API

```
GET  /health
GET  /users
GET  /users/:id
POST /users   { "displayName": "Maya" }
```

## Repo

```
apps/api      Express, TypeScript
apps/mobile   Flutter
```

