import { AsyncPipe, DatePipe } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Priority } from '../../types/priority.enum';
import { Status } from '../../types/status.enum';
import { Task } from '../../types/task';
import { TasksService } from '../../services/tasks/tasks';
import { getEnumNameByValue } from '@app/shared/helpers/get-enum-name-by-value';

export type AlertType = 'BLOCKED_TASK' | 'HIGH_PRIORITY' | 'INACTIVE';

export interface SystemAlert {
  type: AlertType;
  message: string;
  timestamp: Date;
}

@Component({
  selector: 'nlnd-tasks-table',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './tasks-table.html',
  styleUrl: './tasks-table.css',
})
export class TasksTable implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly tasksService = inject(TasksService);
  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);

  loading = signal(false);
  Status = Status;
  Priority = Priority;
  tasks$ = this.tasksSubject.asObservable();

  ngOnInit() {
    this.getTasks();
    this.subscribeToTasks();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getBadgeClass(priority: number): string {
    switch (priority) {
      case Priority.High:
        return 'badge-error';
      case Priority.Medium:
        return 'badge-warning';
      case Priority.Low:
        return 'badge-success';
      default:
        return 'badge-success';
    }
  }

  getPriorityNameByValue(priority: number): string {
    return getEnumNameByValue(Priority, priority);
  }

  getRelatedTaskNames(dependsOn: number[] | undefined): string {
    if (!dependsOn?.length) return '';
    return dependsOn.map((id) => this.getTaskNameById(id)).join(', ');
  }

  getStatusNameByValue(value: number): string {
    return getEnumNameByValue(Status, value);
  }

  getTasks() {
    this.loading.set(true);
    this.tasksService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasksSubject.next(tasks);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      },
    });
  }

  getTaskNameById(id: number): string {
    const task = this.tasksSubject.value.find((t) => t.id === id);
    return task ? `#${task.title}` : '';
  }

  subscribeToTasks() {
    this.tasks$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (tasks) => {
        // Execute your code here when tasks change
        console.log('Tasks updated:', tasks);
        // Add your logic here
      },
      error: (error) => {
        console.error('Error in tasks subscription:', error);
      },
    });
  }
}
