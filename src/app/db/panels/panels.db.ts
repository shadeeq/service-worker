import Dexie, { Table } from "dexie";
import { Panel } from "./panel.model";

export class PanelsDb extends Dexie {
  panels!: Table<Panel>;

  constructor() {
    super('Panels');
    this.version(1).stores({
      panels: 'id, order, name, show',
    });
    this.open().catch(err => console.log(err.message));
  }
}

export const panelsDb = new PanelsDb();
