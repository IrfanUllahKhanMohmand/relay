import express from "express";
import { createRoom, createUser } from "./models/index.js";

const port = Number(process.env.PORT ?? 3000);
const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    name: "relay-api",
    status: "scaffold",
    models: ["User", "Room", "Message"],
  });
});

app.listen(port, () => {
  const demoHost = createUser({ displayName: "scaffold" });
  const demoRoom = createRoom({ name: "lobby", hostId: demoHost.id });
  console.log(`Relay API listening on ${port} (demo room ${demoRoom.id})`);
});
