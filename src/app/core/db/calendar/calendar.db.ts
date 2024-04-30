import Dexie, { Table } from "dexie";
import { EventInput } from '@fullcalendar/core';

export class CalendarDb extends Dexie {
  calendar!: Table<EventInput>;

  constructor() {
    super('Calendar');
    this.version(1).stores({
      calendar: '++id, title, start, end',
    });
    this.open().catch(err => console.log(err.message));
  }
}

export const calendarDb = new CalendarDb();
