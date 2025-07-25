import { AsyncPipe, DatePipe } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
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
  startAtDate: string | null = null;
  tasks$ = this.tasksSubject.asObservable();
  taskToEdit = signal<Task | null>(null);

  ngOnInit() {
    this.getTasks();
    this.subscribeToTasks();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cancelTaskEdition(): void {
    this.taskToEdit.set(null);
    this.startAtDate = null;
    this.closeModal();
  }

  closeModal(): void {
    this.modal.nativeElement.close();
  }

  submitTaskEdition(): void {
    console.log(this.startAtDate);
    console.log(this.taskToEdit());
    if (!this.taskToEdit() || !this.startAtDate) {
      this.closeModal();
      return;
    }

    const updatedTask = {
      ...this.taskToEdit()!,
      startAt: new Date(this.startAtDate),
    };

    const currentTasks = this.tasksSubject.value;
    const taskIndex = currentTasks.findIndex((t) => t.id === updatedTask.id);

    if (taskIndex !== -1) {
      const updatedTasks = [...currentTasks];
      updatedTasks[taskIndex] = updatedTask;
      this.tasksSubject.next(updatedTasks);
    }

    this.taskToEdit.set(null);
    this.startAtDate = null;
    this.closeModal();
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

  openModal(): void {
    this.modal.nativeElement.showModal();
  }

  startTaskEdition(task: Task): void {
    this.taskToEdit.set(task);
    this.openModal();
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
