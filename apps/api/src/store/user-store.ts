import { hashPassword, verifyPassword } from "../auth/password.js";
import { createUser, type User } from "../models/user.js";

export class UserStore {
  private readonly users = new Map<string, User>();
  private readonly byName = new Map<string, string>();

  create(displayName: string): User {
    const name = displayName.trim().toLowerCase();
    if (this.byName.has(name)) {
      throw new Error("displayName is taken");
    }
    const user = createUser({ displayName });
    this.save(user);
    return user;
  }

  async register(displayName: string, password: string): Promise<User> {
    const name = displayName.trim().toLowerCase();
    if (this.byName.has(name)) {
      throw new Error("displayName is taken");
    }
    const user = createUser({
      displayName,
      passwordHash: await hashPassword(password),
    });
    this.save(user);
    return user;
  }

  async authenticate(
    displayName: string,
    password: string,
  ): Promise<User | undefined> {
    const id = this.byName.get(displayName.trim().toLowerCase());
    if (!id) {
      return undefined;
    }
    const user = this.users.get(id);
    if (!user?.passwordHash) {
      return undefined;
    }
    const ok = await verifyPassword(password, user.passwordHash);
    return ok ? user : undefined;
  }

  get(id: string): User | undefined {
    return this.users.get(id);
  }

  list(): User[] {
    return [...this.users.values()];
  }

  private save(user: User): void {
    this.users.set(user.id, user);
    this.byName.set(user.displayName.trim().toLowerCase(), user.id);
  }
}

export function serializeUser(user: User) {
  return {
    id: user.id,
    displayName: user.displayName,
    createdAt: user.createdAt.toISOString(),
  };
}
