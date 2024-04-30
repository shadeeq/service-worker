import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PanelsService } from "../../core/services/panels.service";
import { RouterLink } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { CreateComponentDirective } from "../../core/directives/create-component.directive";
import { from } from "rxjs";

@Component({
  selector: 'app-panels',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    CreateComponentDirective
  ],
  templateUrl: './panels.component.html',
  styleUrl: './panels.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelsComponent {
  menuItems$ = from(this.panelsService.getAll());

  constructor(private readonly panelsService: PanelsService) {}
}
