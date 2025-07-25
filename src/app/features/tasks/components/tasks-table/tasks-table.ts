import { AsyncPipe, DatePipe } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { ArrowPath } from '@shared/components/icons/arrow-path/arrow-path';
import { BadgeType } from '@app/shared/types/badges/badge-type.enum';
import { BreakLine } from '@shared/components/spacing/break-line/break-line';
import { Button } from '@shared/components/buttons/button/button';
import { ButtonBehaviour } from '@app/shared/types/buttons/button-behaviour.enum';
import { ButtonType } from '@app/shared/types/buttons/button-type.enum';
import { DateInput } from '@app/shared/components/inputs/date-input/date-input';
import { FormsModule } from '@angular/forms';
import { Heading2 } from '@shared/components/headings/heading-2/heading-2';
import { Loader } from '@shared/components/loader/loader';
import { Paragraph } from '@shared/components/paragraph/paragraph';
import { Priority } from '../../types/priority.enum';
import { Status } from '../../types/status.enum';
import { Task } from '../../types/task';
import { TasksService } from '../../services/tasks/tasks';
import { XMark } from '@shared/components/icons/x-mark/x-mark';
import { getEnumNameByValue } from '@shared/helpers/get-enum-name-by-value';

export type AlertType = 'BLOCKED_TASK' | 'HIGH_PRIORITY' | 'INACTIVE';

export interface SystemAlert {
  type: AlertType;
  message: string;
  timestamp: Date;
}

@Component({
  selector: 'nlnd-tasks-table',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    Loader,
    FormsModule,
    Heading2,
    Paragraph,
    BreakLine,
    Button,
    ArrowPath,
    XMark,
    DateInput,
  ],
  templateUrl: './tasks-table.html',
})
export class TasksTable implements OnInit, OnDestroy {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  private readonly destroy$ = new Subject<void>();
  private readonly tasksService = inject(TasksService);
  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);

  ButtonBehaviour = ButtonBehaviour;
  ButtonType = ButtonType;
  loading = signal<boolean>(false);
  Status = Status;
  Priority = Priority;
  startAtDate = signal<string | null>(null);
  tasks$ = this.tasksSubject.asObservable();
  taskToEdit = signal<Task | null>(null);

  ngOnInit() {
    this.getTasks();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addRandomTask(): void {
    this.tasksService.addRandomTask().subscribe({
      next: () => {
        this.getTasks();
      },
      error: (error) => {
        console.error('Error adding random task:', error);
      },
    });
  }

  cancelTask(taskId: number): void {
    console.log('Cancelling task with ID:', taskId);
    const task = this.tasksSubject.value.find((t) => t.id === taskId);
    if (!task) {
      console.warn('Task not found');
      return;
    }

    this.tasksService.cancelTask(task.id).subscribe({
      next: () => {
        this.getTasks(); // Refresh the tasks list
      },
      error: (error) => {
        console.error('Error cancelling task:', error);
      },
    });
  }

  cancelTaskEdition(): void {
    this.taskToEdit.set(null);
    this.startAtDate.set(null);
    this.closeModal();
  }

  restartTask(taskId: number): void {
    console.log('Restarting task with ID:', taskId);
    this.tasksService.restartTask(taskId).subscribe({
      next: () => {
        this.getTasks(); // Refresh the tasks list
      },
      error: (error) => {
        console.error('Error restarting task:', error);
      },
    });
  }

  submitTaskEdition(): void {
    if (!this.taskToEdit() || !this.startAtDate) {
      this.closeModal();
      return;
    }

    const updatedTask = {
      ...this.taskToEdit()!,
      startAt: new Date(this.startAtDate()!),
    };

    this.tasksService.updateTask(updatedTask).subscribe({
      next: () => {
        this.getTasks();
        this.taskToEdit.set(null);
        this.startAtDate.set(null);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error updating task:', error);
        this.closeModal();
      },
    });
  }

  getBadgeClass(priority: number): string {
    switch (priority) {
      case Priority.High:
        return BadgeType.Error;
      case Priority.Medium:
        return BadgeType.Warning;
      case Priority.Low:
        return BadgeType.Success;
      default:
        return BadgeType.Success;
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

  startTaskEdition(task: Task): void {
    this.taskToEdit.set(task);
    this.openModal();
  }

  private closeModal(): void {
    this.modal.nativeElement.close();
  }

  private getTasks() {
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

  private getTaskNameById(id: number): string {
    const task = this.tasksSubject.value.find((t) => t.id === id);
    return task ? `#${task.title}` : '';
  }

  private openModal(): void {
    this.modal.nativeElement.showModal();
  }
}
