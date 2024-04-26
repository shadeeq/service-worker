import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/layout/layout-routing').then((m) => m.routes)
  }
];
