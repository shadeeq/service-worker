import { Component } from '@angular/core';
import { CardComponent } from "../../../shared/card/card.component";

@Component({
  selector: 'app-card-demo',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './card-demo.component.html',
  styleUrl: './card-demo.component.css'
})
export class CardDemoComponent {
  panelTitle = 'Information panel title';
  icon = ' list_alt';
}
