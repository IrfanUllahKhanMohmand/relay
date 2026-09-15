import express from "express";

import { readAccessToken, signAccessToken } from "./auth/token.js";
import { serializeUser, UserStore } from "./store/user-store.js";

export type AppOptions = {
  store?: UserStore;
  jwtSecret: Uint8Array;
};

function bearer(header: string | undefined): string | undefined {
  if (!header?.startsWith("Bearer ")) {
    return undefined;
  }
  return header.slice("Bearer ".length).trim();
}

export function createApp(options: AppOptions) {
  const store = options.store ?? new UserStore();
  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ name: "relay-api", status: "ok" });
  });

  app.post("/auth/register", async (req, res) => {
    try {
      const displayName =
        typeof req.body?.displayName === "string" ? req.body.displayName : "";
      const password =
        typeof req.body?.password === "string" ? req.body.password : "";
      const user = await store.register(displayName, password);
      const token = await signAccessToken(user.id, options.jwtSecret);
      res.status(201).json({ token, user: serializeUser(user) });
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "invalid registration",
      });
    }
  });

  app.post("/auth/login", async (req, res) => {
    const displayName =
      typeof req.body?.displayName === "string" ? req.body.displayName : "";
    const password =
      typeof req.body?.password === "string" ? req.body.password : "";
    const user = await store.authenticate(displayName, password);
    if (!user) {
      res.status(401).json({ error: "invalid credentials" });
      return;
    }
    const token = await signAccessToken(user.id, options.jwtSecret);
    res.json({ token, user: serializeUser(user) });
  });

  app.get("/users/me", async (req, res) => {
    const token = bearer(req.headers.authorization);
    if (!token) {
      res.status(401).json({ error: "missing token" });
      return;
    }
    const userId = await readAccessToken(token, options.jwtSecret);
    if (!userId) {
      res.status(401).json({ error: "invalid token" });
      return;
    }
    const user = store.get(userId);
    if (!user) {
      res.status(401).json({ error: "invalid token" });
      return;
    }
    res.json(serializeUser(user));
  });

  app.get("/users", (_req, res) => {
    res.json(store.list().map(serializeUser));
  });

  app.get("/users/:id", (req, res) => {
    const user = store.get(req.params.id);
    if (!user) {
      res.status(404).json({ error: "user not found" });
      return;
    }
    res.json(serializeUser(user));
  });

  app.post("/users", (req, res) => {
    try {
      const displayName =
        typeof req.body?.displayName === "string" ? req.body.displayName : "";
      const user = store.create(displayName);
      res.status(201).json(serializeUser(user));
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "invalid user",
      });
    }
  });

  return app;
}
