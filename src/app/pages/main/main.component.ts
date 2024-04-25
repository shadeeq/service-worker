import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent } from "../../reusable-components/sidebar/sidebar.component";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SidebarComponent,
    AsyncPipe,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {

  version = '6.1.10';

}
