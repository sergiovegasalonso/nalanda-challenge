import { Component } from '@angular/core';
import { TasksTable } from '../../components/tasks-table/tasks-table';

@Component({
  selector: 'nlnd-task-manager',
  standalone: true,
  imports: [TasksTable],
  templateUrl: './task-manager.html',
  styleUrl: './task-manager.css',
})
export class TaskManager {}
