import { ChangeDetectorRef, Component } from '@angular/core';
import { FullCalendarModule } from "@fullcalendar/angular";
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarService } from '../../core/services/calendar.service';
import { from, map } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { MatDialog } from '@angular/material/dialog';
import { CalendarPopupComponent } from '../calendar-popup/calendar-popup.component';

export enum EventStatus{
  Red = 0,
  Green = 1,
  Blue = 2,
  Normal = 3,
  NormalBlue = 4,
  NormalGreen = 5,
  YellowBackground = 6
}

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
      eventContent: (arg) => this.customEventContent(arg)
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
        if (event){
          this.addStylesOnStatus(event)
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

  addStylesOnStatus(event: any){
    if (event.allDay) {
      event.display = 'background'
    }
    if (event.status){
      switch (event.status){
        case EventStatus.Red:
          event.color = 'red';
          break;
        case EventStatus.Blue:
          event.color = 'blue';
          break;
        case EventStatus.Green:
          event.color = 'green';
          break;
        case EventStatus.Normal:
          event.color = 'white';
          event.textColor = 'black'
          event.borderColor = 'black'
          break;
        case EventStatus.NormalGreen:
          event.textColor = 'green'
          event.className = 'green-white'
          break;
        case EventStatus.NormalBlue:
          event.textColor = 'blue'
          event.className =  'blue-white'
          break;
        case EventStatus.YellowBackground:
          event.textColor = 'black'
          event.display = 'background'
          event.backgroundColor = 'yellow'
          break;
      }
    }
  }

  customEventContent(arg: { event: any }) {

    let arrayOfDomNodes:any[] = []

    if (arg.event.title) {
      let title = document.createElement('p')
      title.className = "event-title"
      title.innerHTML = arg.event.title
      arrayOfDomNodes = [...arrayOfDomNodes, title]
    }

    if (arg.event.extendedProps.eventStartTime && arg.event.extendedProps.eventEndTime ) {
      let time = document.createElement('p')
      time.className = "event-time"
      time.innerHTML = arg.event.extendedProps.eventStartTime + '-' + arg.event.extendedProps.eventEndTime
      arrayOfDomNodes = [...arrayOfDomNodes, time]
    }

    return { domNodes: arrayOfDomNodes }
  }

}
