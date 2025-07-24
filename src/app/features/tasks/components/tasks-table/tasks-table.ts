import { Component, OnInit, inject, signal } from '@angular/core';
import { TasksService } from '../../services/tasks/tasks';
import { Task } from '../../types/task';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'nlnd-tasks-table',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './tasks-table.html',
  styleUrl: './tasks-table.css',
})
export class TasksTable implements OnInit {
  private readonly tasksService = inject(TasksService);

  tasks = signal<Task[]>([]);

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    return this.tasksService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      },
    });
  }
}
