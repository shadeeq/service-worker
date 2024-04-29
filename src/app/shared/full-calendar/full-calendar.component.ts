import { ChangeDetectorRef, Component } from '@angular/core';
import { FullCalendarModule } from "@fullcalendar/angular";
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarService } from '../../core/services/calendar.service';
import { from, map } from "rxjs";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-full-calendar',
  standalone: true,
  imports: [
    FullCalendarModule,
    AsyncPipe
  ],
  templateUrl: './full-calendar.component.html',
  styleUrl: './full-calendar.component.scss'
})
export class FullCalendarComponent {

  calendarOptions$ = from(this.calendarService.getAll()).pipe(
    map(events => this.setupCalendar(events)),
  );

  constructor(
    private changeDetector: ChangeDetectorRef,
    private readonly calendarService: CalendarService
  ) {}

  setupCalendar(events: EventInput): CalendarOptions {
    return {
      plugins: [
        interactionPlugin,
        dayGridPlugin,
      ],
      initialView: 'dayGridMonth',
      initialEvents: events,
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this)
    }
  }

  handleDateSelect(selectInfo: DateSelectArg): void {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      const event = {
        id: new Date().getTime().toString(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      }
      calendarApi.addEvent(event);
      this.calendarService.addCalendarEvent(event)
    }
  }

  handleEventClick(clickInfo: EventClickArg): void {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
      this.calendarService.deleteCalendarEvent(clickInfo.event.id);
    }
  }

  handleEvents(events: EventApi[]): void {
    console.log(events);
    this.changeDetector.detectChanges();
  }
}
