import { ChangeDetectorRef, Component } from '@angular/core';
import { FullCalendarModule } from "@fullcalendar/angular";
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarService } from '../../core/services/calendar.service';
import { from, map } from "rxjs";
import { AsyncPipe, DatePipe, JsonPipe } from "@angular/common";
import { MatDialog } from '@angular/material/dialog';
import { CalendarPopupComponent } from '../calendar-popup/calendar-popup.component';
import { MatIcon } from "@angular/material/icon";

export enum EventStatus{
  Red = 0,
  Green = 1,
  Blue = 2,
  Normal = 3,
  NormalBlue = 4,
  NormalGreen = 5,
}

@Component({
  selector: 'app-full-calendar',
  standalone: true,
  imports: [
    FullCalendarModule,
    AsyncPipe,
    JsonPipe,
    DatePipe,
    MatIcon
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
    private readonly calendarService: CalendarService,
    private readonly dialog: MatDialog,
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
      eventsSet: this.handleEvents.bind(this),
    }
  }

  handleDateSelect(selectInfo: DateSelectArg): void {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    this.dialog.open(CalendarPopupComponent, {
      data: {
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      }
    })
      .afterClosed()
      .subscribe(event => {
        if (event) {
          calendarApi.addEvent(event);
          this.calendarService.addCalendarEvent(event);
        }
      })
  }

  handleEventClick(clickInfo: EventClickArg): void {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
      this.calendarService.deleteCalendarEvent(clickInfo.event.id);
    }
  }

  handleEvents(events: EventApi[]): void {
    this.changeDetector.detectChanges();
  }
}
