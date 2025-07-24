import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/tasks/tasks-routing-module').then(
        (m) => m.TasksRoutingModule,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('@views/page-not-found/page-not-found').then(
        (c) => c.PageNotFound,
      ),
  },
];
