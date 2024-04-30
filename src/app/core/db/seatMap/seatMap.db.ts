import Dexie, { Table } from "dexie";
import { Rows } from "./seatMap.model";

export class SeatMapDb extends Dexie {
  seatMap!: Table<Rows>;

  constructor() {
    super('SeatMap');
    this.version(1).stores({
      seatMap: '++id, row, exitRow',
    });
    this.open().catch(err => console.log(err.message));
  }
}

export const seatMapDb = new SeatMapDb();
