import {
  Component,
  OnInit,
  PLATFORM_ID,
  TransferState,
  inject,
  makeStateKey,
  signal,
} from '@angular/core';
import { DatePipe, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Task } from '../../types/task';
import { TasksService } from '../../services/tasks/tasks';

const tasksKey = makeStateKey<Task[]>('tasksKey');

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
    if (isPlatformServer(this.platformId)) {
      this.getTasks();
    } else if (isPlatformBrowser(this.platformId)) {
      this.tasks.set(this.transferState.get<Task[]>(tasksKey, []));
    }
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
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(tasksKey, tasks);
        }
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
