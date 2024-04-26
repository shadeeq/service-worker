import { Component } from '@angular/core';
import { PopupService } from "../../core/services/popup.service";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-confirm-button',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './confirm-button.component.html',
  styleUrl: './confirm-button.component.css'
})
export class ConfirmButtonComponent {

  constructor(private readonly popupService: PopupService) {}

  showPopup(): void {
    this.popupService.showPopup();
  }
}
