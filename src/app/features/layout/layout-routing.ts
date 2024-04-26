import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('../main/main.component').then(c => c.MainComponent)
      },
      // {
      //   path: 'a',
      //   loadComponent: () => import('../../features/page-a/page-a.component').then((c) => c.PageAComponent)
      // },
      // {
      //   path: 'b',
      //   loadComponent: () => import('../../features/page-b/page-b.component').then((c) => c.PageBComponent)
      // },
      // {
      //   path: 'c',
      //   loadComponent: () => import('../../features/page-c/page-c.component').then((c) => c.PageCComponent)
      // }
    ]
  }


];
