import { Component } from '@angular/core';
import { ItemContentComponent } from "../../shared/item-content/item-content.component";
import { AsyncPipe } from "@angular/common";
import { PanelsService } from "../../core/services/panels.service";
import { switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-page-b',
  standalone: true,
  imports: [
    ItemContentComponent,
    AsyncPipe,
  ],
  templateUrl: './page-b.component.html',
  styleUrl: './page-b.component.css'
})
export class PageBComponent {
  item$ = this.route.params.pipe(
    switchMap(() => this.dataService.getPanelById('2'))
  );

  constructor(private readonly dataService: PanelsService, private readonly route: ActivatedRoute) {}
}
