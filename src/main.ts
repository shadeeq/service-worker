import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from "./environments/environment";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./app/serviceWorker/show-popups-service-worker.js').then(registration => {
        if (registration.active) {
          registration.active.postMessage({
            type: 'SET_SHOW_POPUPS',
            showPopups: environment.showPopups
          })
        }
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        console.error('ServiceWorker registration failed: ', err);
      });
    });
}


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
