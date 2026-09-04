# Relay

Live rooms: create a room, join, chat, and see who is present. This is a full-stack sample (Flutter + Node), not a marketplace or swap board.

## Status

Scaffold (4 Sep 2026): repo layout, core models, Docker Compose stub. Auth, WebSockets, and the Flutter client come on later weekdays.

## Layout

```
apps/api      TypeScript + Express (Mongo later)
apps/mobile   Flutter (iOS, Android, web)
```

## Run locally

**API** (no Mongo required for this scaffold):

```bash
cd apps/api
cp .env.example .env
npm install
npm run dev
```

**Compose** (Mongo + API image):

```bash
docker compose up --build
```

**Mobile:**

```bash
cd apps/mobile
flutter pub get
flutter run
```

## Models

- `User` — id, display name
- `Room` — named room with a host
- `Message` — chat line in a room

## v1 target

Login, create/join room, chat, presence, reconnect, Compose, API CI.
