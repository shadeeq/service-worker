import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('../main/main.component').then(c => c.MainComponent),
        children: [
          {
            path: 'seatmap',
            loadComponent: () => import('../demo/seatmap-demo/seatmap-demo.component').then(c => c.SeatmapDemoComponent),
          },
          {
            path: 'panels',
            loadComponent: () => import('../demo/panels-demo/panels-demo.component').then(c => c.PanelsDemoComponent),
          },
          {
            path: 'calendar',
            loadComponent: () => import('../demo/calendar-demo/calendar-demo.component').then(c => c.CalendarDemoComponent),
          },
          {
            path: 'card',
            loadComponent: () => import('../demo/card-demo/card-demo.component').then(c => c.CardDemoComponent),
          },
        ],
      },
    ],
  },
];
