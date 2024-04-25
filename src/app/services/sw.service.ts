import { Injectable } from '@angular/core';
import { SwUpdate } from "@angular/service-worker";
import { PopupService } from "./popup.service";
import { concatMap, EMPTY, tap } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SwService {

  constructor(
    private readonly swUpdate: SwUpdate,
    private readonly popupService: PopupService
  ) {}

  checkForUpdate(): void {
    console.log('checkForUpdate', this.swUpdate);
    if (this.swUpdate.isEnabled) {
      console.log('checkin for update')
      this.swUpdate.versionUpdates.pipe(
        tap(r => {
          console.log('UPDATES:', r)
        }),
        concatMap(update => {
          console.log('UPDATE TYPE', update.type);
          switch (update.type) {
            case "VERSION_DETECTED":
              console.log('VERSION_DETECTED')
              return EMPTY
            case "VERSION_READY":
              if (environment.showPopups) {
                console.log('SHOW_POPUPS')
                return this.popupService.showUpdateConfirmationPopup().pipe(tap((r) => {
                  if (r) {
                    this.updateSw();
                  }
                }));
              } else {
                console.warn('FORCE UPDATE !!!');
                this.updateSw();
                return EMPTY;
              }
            case "VERSION_INSTALLATION_FAILED":
              console.warn('Error while installing update, cache will be cleared and page reloaded');
              console.error(update.error);
              return EMPTY;
            default:
              console.log(update.type);
              return EMPTY;
          }
        })
      ).subscribe();
    }

  }

  updateSw(): void {
    console.log('UPDATE SW');
    this.swUpdate.activateUpdate()
      .then(() => document.location.reload())
      .catch((error) => console.error(error));
    console.log('new version enabled, trying to install')
  }
}
