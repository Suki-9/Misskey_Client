import Dexie, { Table } from 'dexie';
import { components } from 'misskey-js/autogen/types.js';

export class IndexedDB extends Dexie {
  private misskeyLiginUser?: Table<LoginUser>;
  private emojisIndex?: Table<{
    host: string,
    index: components['schemas']['EmojiSimple'][],
  }>;

  constructor() {
    super('kurageDB');
    this.version(1).stores({
      misskeyLiginUser: 'userId, userName, token, avatarURL, host, userData',
      emojisIndex: 'host, index',
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

  public async emojisIndexUser() {
    if ('emojisIndex' in this) {
      this.emojisIndex?.clear();
    }
  }

  public async addUser(userData: LoginUser) {
    if ('misskeyLiginUser' in this) {
      this.misskeyLiginUser?.put(userData);
    }
  }
  
  public async addEmojisIndex(host: string, index: components['schemas']['EmojiSimple'][]): Promise<void> {
    if ('misskeyLiginUser' in this) {
      this.emojisIndex?.put({
        host: host,
        index: index,
      }).catch(() => {
        alert('updateIndex faild');
        throw new Error("Fetch Err.");
      })
    } else {
      throw new Error("DB Err.");
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

  public async readEmojisIndex(host: string): Promise<components['schemas']['EmojiSimple'][]> {
    if ('emojisIndex' in this) {
      const result = this.emojisIndex?.where({ host: host }).toArray();
      if (result && await result.then(() => true).catch(() => false)) return (await result)[0].index;
    }
    throw new Error("なんかえらー");
  }

  public async deleteUSer(userId: string) {
    if (this.misskeyLiginUser) {
      this.misskeyLiginUser.delete(userId);
    }
  }
}