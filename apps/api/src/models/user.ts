export interface User {
  id: string;
  displayName: string;
  createdAt: Date;
}

export function createUser(input: { displayName: string; id?: string }): User {
  const displayName = input.displayName.trim();
  if (!displayName) {
    throw new Error("displayName is required");
  }

  return {
    id: input.id ?? crypto.randomUUID(),
    displayName,
    createdAt: new Date(),
  };
}
