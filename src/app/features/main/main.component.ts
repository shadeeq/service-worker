import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { AsyncPipe } from "@angular/common";
import {
  CardComponent,
} from "../../shared/card/card.component";
import { FullCalendarComponent } from "../../reusable-components/full-calendar/full-calendar.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SidebarComponent,
    AsyncPipe,
    CardComponent,
    FullCalendarComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  version = '6.1.12';
  panelTitle = 'Information panel title';
  icon = ' list_alt';
}
