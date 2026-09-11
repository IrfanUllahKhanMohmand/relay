import { createApp } from "./app.js";
import { UserStore } from "./store/user-store.js";

const port = Number(process.env.PORT ?? 3000);
const store = new UserStore();
store.create("Maya");

createApp(store).listen(port, () => {
  console.log(`Relay API listening on ${port}`);
});
