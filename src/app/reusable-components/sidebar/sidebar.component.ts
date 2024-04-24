import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from "../../services/data.service";
import { map } from "rxjs";
import { RouterLink } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { Panel } from "../../models/panel.model";
import { CreateComponentDirective } from "../../directives/create-component.directive";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    CreateComponentDirective
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

  menuItems$ = this.dataService.getPanels().pipe(
    map((items: Panel[]) => items.sort((a, b) => a.order - b.order).filter(item => item.show))
  )

  constructor(private readonly dataService: DataService,) {}
}
