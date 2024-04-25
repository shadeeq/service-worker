import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PanelsService } from "../../services/panels.service";
import { RouterLink } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { CreateComponentDirective } from "../../directives/create-component.directive";
import { Observable } from "rxjs";
import { Panel } from "../../db/panels/panel.model";

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
  menuItems$ = (this.panelsService.getAll() as unknown as Observable<Panel[]>);

  constructor(private readonly panelsService: PanelsService) {}
}
