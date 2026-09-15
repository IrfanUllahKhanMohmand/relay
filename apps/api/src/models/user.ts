export interface User {
  id: string;
  displayName: string;
  passwordHash?: string;
  createdAt: Date;
}

export function createUser(input: {
  displayName: string;
  id?: string;
  passwordHash?: string;
}): User {
  const displayName = input.displayName.trim();
  if (!displayName) {
    throw new Error("displayName is required");
  }

  return {
    id: input.id ?? crypto.randomUUID(),
    displayName,
    passwordHash: input.passwordHash,
    createdAt: new Date(),
  };
}
