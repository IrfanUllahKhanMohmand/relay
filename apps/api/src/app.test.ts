import assert from "node:assert/strict";
import { describe, it } from "node:test";
import request from "supertest";

import { createApp } from "./app.js";
import { UserStore } from "./store/user-store.js";

describe("health", () => {
  it("returns ok", async () => {
    const response = await request(createApp()).get("/health");
    assert.equal(response.status, 200);
    assert.equal(response.body.status, "ok");
  });
});

describe("users", () => {
  it("creates and fetches a user", async () => {
    const app = createApp(new UserStore());
    const created = await request(app)
      .post("/users")
      .send({ displayName: "Hassan" });

    assert.equal(created.status, 201);
    assert.equal(created.body.displayName, "Hassan");

    const fetched = await request(app).get(`/users/${created.body.id}`);
    assert.equal(fetched.status, 200);
    assert.equal(fetched.body.displayName, "Hassan");
  });

  it("rejects a blank name", async () => {
    const response = await request(createApp()).post("/users").send({
      displayName: "  ",
    });
    assert.equal(response.status, 400);
  });
});
