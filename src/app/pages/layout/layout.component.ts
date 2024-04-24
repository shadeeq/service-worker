import { Component } from '@angular/core';
import { AsyncPipe } from "@angular/common";
import { SidebarComponent } from "../../reusable-components/sidebar/sidebar.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    AsyncPipe,
    SidebarComponent,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
