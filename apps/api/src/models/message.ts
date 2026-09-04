export interface Message {
  id: string;
  roomId: string;
  authorId: string;
  body: string;
  createdAt: Date;
}

export function createMessage(input: {
  roomId: string;
  authorId: string;
  body: string;
  id?: string;
}): Message {
  const body = input.body.trim();
  if (!input.roomId.trim()) {
    throw new Error("roomId is required");
  }
  if (!input.authorId.trim()) {
    throw new Error("authorId is required");
  }
  if (!body) {
    throw new Error("body is required");
  }

  return {
    id: input.id ?? crypto.randomUUID(),
    roomId: input.roomId,
    authorId: input.authorId,
    body,
    createdAt: new Date(),
  };
}
