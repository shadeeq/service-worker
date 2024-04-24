import { Injectable } from '@angular/core';
import Dexie from "dexie";

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {

  private db: any;

  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    this.db = new Dexie('MyDatabase');
    this.db.version(1).stores({
      myObjects: '++id, name, data'
    });
  }

  async addObject(object: any): Promise<void> {
    await this.db.myObjects.add(object);
  }

  async getObject(id: number): Promise<any> {
    return await this.db.myObjects.get(id);
  }

  async getAllObjects(): Promise<any[]> {
    return await this.db.myObjects.toArray();
  }

  async deleteObject(id: number): Promise<void> {
    await this.db.myObjects.delete(id);
  }
}
