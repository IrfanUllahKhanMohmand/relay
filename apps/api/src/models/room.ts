export interface Room {
  id: string;
  name: string;
  hostId: string;
  createdAt: Date;
}

export function createRoom(input: {
  name: string;
  hostId: string;
  id?: string;
}): Room {
  const name = input.name.trim();
  if (!name) {
    throw new Error("name is required");
  }
  if (!input.hostId.trim()) {
    throw new Error("hostId is required");
  }

  return {
    id: input.id ?? crypto.randomUUID(),
    name,
    hostId: input.hostId,
    createdAt: new Date(),
  };
}
