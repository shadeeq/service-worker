import { Component } from '@angular/core';
import { ItemContentComponent } from "../../reusable-components/item-content/item-content.component";
import { AsyncPipe } from "@angular/common";
import { DataService } from "../../services/data.service";
import {switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-page-c',
  standalone: true,
  imports: [
    ItemContentComponent,
    AsyncPipe
  ],
  templateUrl: './page-c.component.html',
  styleUrl: './page-c.component.css'
})
export class PageCComponent {
  item$ = this.route.params.pipe(
    switchMap(() => this.dataService.getPanelById('3'))
  );

  constructor(private readonly dataService: DataService, private readonly route: ActivatedRoute) {
  }
}
