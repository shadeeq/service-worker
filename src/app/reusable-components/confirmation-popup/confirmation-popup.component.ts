import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-popup',
  standalone: true,
  imports: [
  ],
  templateUrl: './confirmation-popup.component.html',
  styleUrl: './confirmation-popup.component.scss'
})
export class ConfirmationPopupComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public popUpData: any,
    ) {
  }

  onClick(event: boolean){
    this.dialogRef.close(event)
  }
}
