import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { EventInput } from '@fullcalendar/core';
import { calendarDb } from '../db/calendar/calendar.db';
import { liveQuery } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  calendarEventId = 0
  todayStr = new Date().toISOString().replace(/T.*$/, '')

  calendarEvents: EventInput[] = [
    {
      id: this.createEventId(),
      title: 'All-day event',
      start: this.todayStr
    },
    {
      id: this.createEventId(),
      title: 'Timed event',
      start: this.todayStr + 'T00:00:00',
      end: this.todayStr + 'T03:00:00'
    },
    {
      id: this.createEventId(),
      title: 'Timed event',
      start: this.todayStr + 'T12:00:00',
      end: this.todayStr + 'T15:00:00'
    }
  ];

  createEventId(): string {
    return String(this.calendarEventId++);
  }

  constructor() {
    this.fetchEvents();
  }

  fetchEvents() {
    of(this.calendarEvents).subscribe(events=> {
      calendarDb.calendar.bulkPut(events)
    });
  }

  getAll() {
    return liveQuery(() =>
      calendarDb.calendar.toArray()
    );
  }

  addCalendarEvent(event: EventInput){
    calendarDb.calendar.put(event);
  }

  deleteCalendarEvent(eventId: string){
    calendarDb.calendar.delete(eventId)
  }

}
