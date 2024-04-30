import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PanelsComponent } from "../panels/panels.component";
import { AsyncPipe } from "@angular/common";
import {
  CardComponent,
} from "../../shared/card/card.component";
import { FullCalendarComponent } from "../../shared/full-calendar/full-calendar.component";
import { SeatMapComponent } from "../../shared/seat-map/seat-map.component";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    PanelsComponent,
    AsyncPipe,
    CardComponent,
    FullCalendarComponent,
    SeatMapComponent,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  version = '6.1.12';
  demoPages = ['panels', 'calendar', 'card'];
}
