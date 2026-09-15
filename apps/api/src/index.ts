import { createApp } from "./app.js";
import { secretFrom } from "./auth/token.js";
import { UserStore } from "./store/user-store.js";

const port = Number(process.env.PORT ?? 3000);
const jwtSecret = secretFrom(process.env.JWT_SECRET ?? "dev-only-change-me");

createApp({ store: new UserStore(), jwtSecret }).listen(port, () => {
  console.log(`Relay API listening on ${port}`);
});
