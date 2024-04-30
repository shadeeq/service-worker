import { Component } from '@angular/core';
import { AsyncPipe } from "@angular/common";
import { PanelsComponent } from "../panels/panels.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    AsyncPipe,
    PanelsComponent,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
