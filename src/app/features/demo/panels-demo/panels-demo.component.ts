import { Component } from '@angular/core';
import { PanelsComponent } from "../../panels/panels.component";

@Component({
  selector: 'app-panels-demo',
  standalone: true,
  imports: [
    PanelsComponent
  ],
  templateUrl: './panels-demo.component.html',
  styleUrl: './panels-demo.component.css'
})
export class PanelsDemoComponent {

}
