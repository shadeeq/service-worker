import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { EventInput } from '@fullcalendar/core';
import { calendarDb } from '../db/calendar/calendar.db';
import { liveQuery } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  todayStr = new Date().toISOString().replace(/T.*$/, '')

  calendarEvents: EventInput[] = [
    {
      id: '1',
      title: 'All-day event',
      start: this.todayStr
    },
    {
      id: '2',
      title: 'Timed event',
      start: this.todayStr + 'T00:00:00',
      end: this.todayStr + 'T03:00:00'
    },
    {
      id: '3',
      title: 'Timed event',
      start: this.todayStr + 'T12:00:00',
      end: this.todayStr + 'T15:00:00'
    }
  ];

  constructor() {
    this.fetchEvents();
  }

  fetchEvents() {
    of(this.calendarEvents).subscribe(events=> {
      calendarDb.calendar.bulkPut(events);
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
    calendarDb.calendar.delete(eventId);
  }

}
