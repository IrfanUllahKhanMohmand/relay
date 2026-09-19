import { secretFrom } from "./auth/token.js";
import { createRelayServer } from "./server.js";
import { UserStore } from "./store/user-store.js";

const port = Number(process.env.PORT ?? 3000);
const jwtSecret = secretFrom(process.env.JWT_SECRET ?? "dev-only-change-me");

const { server } = createRelayServer({
  store: new UserStore(),
  jwtSecret,
});

server.listen(port, () => {
  console.log(`Relay API listening on ${port}`);
});
