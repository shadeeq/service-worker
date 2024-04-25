import { Component } from '@angular/core';
import { ItemContentComponent } from "../../reusable-components/item-content/item-content.component";
import { PanelsService } from "../../services/panels.service";
import { AsyncPipe } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs";

@Component({
  selector: 'app-page-a',
  standalone: true,
  imports: [
    ItemContentComponent,
    AsyncPipe
  ],
  templateUrl: './page-a.component.html',
  styleUrl: './page-a.component.css'
})
export class PageAComponent {
  item$ = this.route.params.pipe(
    switchMap(() => this.dataService.getPanelById('1'))
  );

  constructor(private readonly dataService: PanelsService, private readonly route: ActivatedRoute) {}
}
