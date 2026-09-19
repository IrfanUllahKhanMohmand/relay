import { createServer, type Server as HttpServer } from "node:http";

import { createApp, type AppOptions } from "./app.js";
import { UserStore } from "./store/user-store.js";
import { attachRelaySocket } from "./ws/handshake.js";

export type RelayServer = {
  app: ReturnType<typeof createApp>;
  store: UserStore;
  server: HttpServer;
};

export function createRelayServer(options: AppOptions): RelayServer {
  const store = options.store ?? new UserStore();
  const app = createApp({ ...options, store });
  const server = createServer(app);
  attachRelaySocket(server, { store, jwtSecret: options.jwtSecret });
  return { app, store, server };
}
