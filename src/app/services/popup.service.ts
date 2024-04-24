import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { environment } from "../../environments/environment";
import { ConfirmationPopupComponent } from "../reusable-components/confirmation-popup/confirmation-popup.component";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private readonly dialog: MatDialog,
  ) {}

  showPopup(): void {
    if (environment.showPopups){
      const dialogRef = this.dialog.open(ConfirmationPopupComponent,
        {
          height: '100px',
          width: '200px',
        })
      dialogRef.afterClosed().subscribe((x: any) => {
        alert('CONFIRM:' + x)
      })
    } else {
      alert('SHOWPOPUPS IS SET TO FALSE')
    }

  }
}
