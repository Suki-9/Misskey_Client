import Dexie, { Table } from 'dexie';
import { entities } from "misskey-js";

export class IdexedDB extends Dexie {
  private misskeyLiginUser?: Table<LoginUser>;

  constructor() {
    super('kurageDB');
    this.version(1).stores({
      misskeyLiginUser: 'userId, userName, token, avatarURL, host, userData',
    });
  }

  public async deleteDB() {
    this.delete();
  }

  public async clearUser() {
    if ('misskeyLiginUser' in this) {
      this.misskeyLiginUser?.clear();
    }
  }

  public async addUser(userData: LoginUser) {
    if ('misskeyLiginUser' in this) {
      this.misskeyLiginUser?.put(userData);
    }
  }

  public async readUser(userId?: string): Promise<LoginUser[]> {
    if ('misskeyLiginUser' in this) {
      return (userId
        ? this.misskeyLiginUser?.where({ userId: userId }).toArray()
        : this.misskeyLiginUser?.toArray()
      ) ?? [];
    } else {
      return [];
    }
  }

  public async deleteUSer(userId: string) {
    if (this.misskeyLiginUser) {
      this.misskeyLiginUser.delete(userId);
    }
  }
}