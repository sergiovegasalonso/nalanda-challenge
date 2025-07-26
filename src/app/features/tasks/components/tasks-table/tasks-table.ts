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
import { ArrowPathIcon } from '@shared/components/icons/arrow-path-icon/arrow-path-icon';
import { Badge } from '@shared/components/badge/badge';
import { BadgeColor } from '@shared/types/badge/badge-color.enum';
import { BadgeSize } from '@shared/types/badge/badge-size.enum';
import { BadgeStyle } from '@shared/types/badge/badge-style.enum';
import { BreakLine } from '@shared/components/spacing/break-line/break-line';
import { Button } from '@shared/components/buttons/button/button';
import { ButtonBehaviour } from '@shared/types/buttons/button-behaviour.enum';
import { ButtonType } from '@shared/types/buttons/button-type.enum';
import { CalendarDaysIcon } from '@shared/components/icons/calendar-days-icon/calendar-days-icon';
import { DateInput } from '@shared/components/inputs/date-input/date-input';
import { FormsModule } from '@angular/forms';
import { Heading2 } from '@shared/components/headings/heading-2/heading-2';
import { Loader } from '@shared/components/loader/loader';
import { LoaderSize } from '@shared/types/loader/loader-size.enum';
import { Paragraph } from '@shared/components/paragraph/paragraph';
import { Priority } from '../../types/priority.enum';
import { Status } from '../../types/status.enum';
import { Table } from '@shared/components/table/table';
import { Task } from '../../types/task';
import { TasksService } from '../../services/tasks/tasks';
import { XMarkIcon } from '@shared/components/icons/x-mark-icon/x-mark-icon';
import { finalize } from 'rxjs/operators';
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
    ArrowPathIcon,
    XMarkIcon,
    DateInput,
    Badge,
    CalendarDaysIcon,
    Table,
  ],
  templateUrl: './tasks-table.html',
})
export class TasksTable implements OnInit, OnDestroy {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  private readonly destroy$ = new Subject<void>();
  private readonly tasksService = inject(TasksService);
  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);

  BadgeColor = BadgeColor;
  BadgeSize = BadgeSize;
  BadgeStyle = BadgeStyle;
  ButtonBehaviour = ButtonBehaviour;
  ButtonType = ButtonType;
  LoaderSize = LoaderSize;
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
      next: (restartedTask) => {
        this.getTasks();
        this.tasksService
          .simulateTaskExecution(restartedTask.id)
          .pipe(
            finalize(() => {
              this.getTasks();
            }),
          )
          .subscribe({
            next: () => {
              console.log('Task execution simulated successfully');
            },
            error: (error) => {
              console.error('Error simulating task execution:', error);
            },
          });
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
      next: (updatedTask) => {
        this.getTasks();
        this.taskToEdit.set(null);
        this.startAtDate.set(null);
        this.closeModal();
        if (updatedTask.status === Status.InProgress) {
          this.tasksService
            .simulateTaskExecution(updatedTask.id)
            .pipe(
              finalize(() => {
                this.getTasks();
              }),
            )
            .subscribe({
              next: () => {
                console.log('Task execution simulated successfully');
              },
              error: (error) => {
                console.error('Error simulating task execution:', error);
              },
            });
        }
      },
      error: (error) => {
        console.error('Error updating task:', error);
        this.closeModal();
      },
    });
  }

  getBadgeColorByPriority(priority: number): BadgeColor {
    switch (priority) {
      case Priority.High:
        return BadgeColor.Error;
      case Priority.Medium:
        return BadgeColor.Warning;
      case Priority.Low:
        return BadgeColor.Success;
      default:
        return BadgeColor.Success;
    }
  }

  getBadgeColorByStatus(status: number): BadgeColor {
    switch (status) {
      case Status.New:
        return BadgeColor.Accent;
      case Status.InProgress:
        return BadgeColor.Info;
      case Status.Completed:
        return BadgeColor.Success;
      case Status.Cancelled:
        return BadgeColor.Error;
      case Status.Blocked:
        return BadgeColor.Warning;
      case Status.Failed:
        return BadgeColor.Error;
      default:
        return BadgeColor.Accent;
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
