import express from "express";

import { serializeUser, UserStore } from "./store/user-store.js";

export function createApp(store = new UserStore()) {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ name: "relay-api", status: "ok" });
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
