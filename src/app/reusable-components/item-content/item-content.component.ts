import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Panel } from "../../db/panels/panel.model";
import {ConfirmButtonComponent} from "../confirm-button/confirm-button.component";

@Component({
  selector: 'app-item-content',
  standalone: true,
  imports: [
    ConfirmButtonComponent
  ],
  templateUrl: './item-content.component.html',
  styleUrl: './item-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemContentComponent {
  @Input() item: Panel | undefined;
}
