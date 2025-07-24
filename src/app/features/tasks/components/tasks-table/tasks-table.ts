import {
  Component,
  OnInit,
  PLATFORM_ID,
  TransferState,
  inject,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../types/task';
import { TasksService } from '../../services/tasks/tasks';

@Component({
  selector: 'nlnd-tasks-table',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './tasks-table.html',
  styleUrl: './tasks-table.css',
})
export class TasksTable implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly tasksService = inject(TasksService);
  private readonly transferState = inject(TransferState);

  tasks = signal<Task[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.getTasks();
  }

  getRelatedTaskNames(dependsOn: number[] | undefined): string {
    if (!dependsOn?.length) return '';
    return dependsOn.map((id) => this.getTaskNameById(id)).join(', ');
  }

  getTasks() {
    this.loading.set(true);
    this.tasksService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      },
    });
  }

  getTaskNameById(id: number): string {
    const task = this.tasks().find((t) => t.id === id);
    return task ? `#${task.title}` : '';
  }
}
