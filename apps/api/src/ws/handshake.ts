import type { Server as HttpServer } from "node:http";
import { WebSocketServer, type WebSocket } from "ws";

import { readAccessToken } from "../auth/token.js";
import type { UserStore } from "../store/user-store.js";

export type SocketOptions = {
  store: UserStore;
  jwtSecret: Uint8Array;
  path?: string;
};

function tokenFromRequest(url: string | undefined): string | undefined {
  if (!url) {
    return undefined;
  }
  try {
    const parsed = new URL(url, "http://relay.local");
    const fromQuery = parsed.searchParams.get("token");
    return fromQuery?.trim() || undefined;
  } catch {
    return undefined;
  }
}

export function attachRelaySocket(server: HttpServer, options: SocketOptions) {
  const wss = new WebSocketServer({
    server,
    path: options.path ?? "/ws",
  });

  wss.on("connection", async (socket: WebSocket, request) => {
    const token = tokenFromRequest(request.url);
    if (!token) {
      socket.close(4401, "missing token");
      return;
    }

    const userId = await readAccessToken(token, options.jwtSecret);
    const user = userId ? options.store.get(userId) : undefined;
    if (!user) {
      socket.close(4401, "invalid token");
      return;
    }

    socket.send(
      JSON.stringify({
        type: "hello",
        userId: user.id,
        displayName: user.displayName,
      }),
    );
  });

  return wss;
}
