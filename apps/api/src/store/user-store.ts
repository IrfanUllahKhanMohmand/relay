import { createUser, type User } from "../models/user.js";

export class UserStore {
  private readonly users = new Map<string, User>();

  create(displayName: string): User {
    const user = createUser({ displayName });
    this.users.set(user.id, user);
    return user;
  }

  get(id: string): User | undefined {
    return this.users.get(id);
  }

  list(): User[] {
    return [...this.users.values()];
  }
}

export function serializeUser(user: User) {
  return {
    id: user.id,
    displayName: user.displayName,
    createdAt: user.createdAt.toISOString(),
  };
}
