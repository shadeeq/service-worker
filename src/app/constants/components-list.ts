export const COMPONENTS_LIST = [
  {
    id: '1',
    loadComponent: () => import('../pages/page-a/page-a.component').then(c => c.PageAComponent),
  },
  {
    id: '2',
    loadComponent: () => import('../pages/page-b/page-b.component').then(c => c.PageBComponent),
  },
  {
    id: '3',
    loadComponent: () => import('../pages/page-c/page-c.component').then(c => c.PageCComponent),
  },
  {
    id: '4',
    loadComponent: () => import('../pages/page-d/page-d.component').then(c => c.PageDComponent),
  },
];

export const COMPONENTS_LIST_MAP = COMPONENTS_LIST.reduce((acc, curr) => acc.set(curr.id, curr.loadComponent), new Map());
