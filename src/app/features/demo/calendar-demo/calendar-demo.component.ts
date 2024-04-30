import { Component } from '@angular/core';
import { FullCalendarComponent } from "../../../shared/full-calendar/full-calendar.component";

@Component({
  selector: 'app-calendar-demo',
  standalone: true,
  imports: [
    FullCalendarComponent
  ],
  templateUrl: './calendar-demo.component.html',
  styleUrl: './calendar-demo.component.css'
})
export class CalendarDemoComponent {

}
