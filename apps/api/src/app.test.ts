import assert from "node:assert/strict";
import { describe, it } from "node:test";
import request from "supertest";

import { createApp } from "./app.js";
import { secretFrom } from "./auth/token.js";
import { UserStore } from "./store/user-store.js";

const jwtSecret = secretFrom("test-secret");

function app(store = new UserStore()) {
  return createApp({ store, jwtSecret });
}

describe("health", () => {
  it("returns ok", async () => {
    const response = await request(app()).get("/health");
    assert.equal(response.status, 200);
    assert.equal(response.body.status, "ok");
  });
});

describe("users", () => {
  it("creates and fetches a user", async () => {
    const api = app();
    const created = await request(api)
      .post("/users")
      .send({ displayName: "Hassan" });

    assert.equal(created.status, 201);
    assert.equal(created.body.displayName, "Hassan");

    const fetched = await request(api).get(`/users/${created.body.id}`);
    assert.equal(fetched.status, 200);
    assert.equal(fetched.body.displayName, "Hassan");
  });

  it("rejects a blank name", async () => {
    const response = await request(app()).post("/users").send({
      displayName: "  ",
    });
    assert.equal(response.status, 400);
  });
});

describe("auth", () => {
  it("registers, logs in, and reads the current user", async () => {
    const api = app();
    const registered = await request(api).post("/auth/register").send({
      displayName: "Maya",
      password: "password12",
    });

    assert.equal(registered.status, 201);
    assert.equal(typeof registered.body.token, "string");
    assert.equal(registered.body.user.passwordHash, undefined);

    const me = await request(api)
      .get("/users/me")
      .set("Authorization", `Bearer ${registered.body.token}`);
    assert.equal(me.status, 200);
    assert.equal(me.body.displayName, "Maya");

    const login = await request(api).post("/auth/login").send({
      displayName: "maya",
      password: "password12",
    });
    assert.equal(login.status, 200);
    assert.equal(typeof login.body.token, "string");
  });

  it("rejects a bad password", async () => {
    const api = app();
    await request(api).post("/auth/register").send({
      displayName: "Maya",
      password: "password12",
    });
    const login = await request(api).post("/auth/login").send({
      displayName: "Maya",
      password: "wrong-password",
    });
    assert.equal(login.status, 401);
  });
});
