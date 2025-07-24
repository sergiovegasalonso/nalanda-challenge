import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks/task-manager',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks/task-manager',
    title: 'Nalanda Challenge - Task Manager',
    loadComponent: () =>
      import('./views/task-manager/task-manager').then((c) => c.TaskManager),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
