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
import { AccentButton } from '@app/shared/components/buttons/accent-button/accent-button';
import { ArrowPathIcon } from '@shared/components/icons/arrow-path-icon/arrow-path-icon';
import { Badge } from '@shared/components/badge/badge';
import { BadgeColor } from '@app/shared/components/badge/configuration/badge-color.enum';
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
import { NotificationsService } from '@features/notifications/services/notifications';
import { Paragraph } from '@shared/components/paragraph/paragraph';
import { PlusCircleIcon } from '@app/shared/components/icons/plus-circle-icon/plus-circle-icon';
import { Priority } from '../../types/priority.enum';
import { Status } from '../../types/status.enum';
import { Table } from '@shared/components/table/table';
import { TableModifier } from '@shared/types/table/table-modifier.enum';
import { Task } from '../../types/task';
import { TasksService } from '../../services/tasks';
import { XMarkIcon } from '@shared/components/icons/x-mark-icon/x-mark-icon';
import { finalize } from 'rxjs/operators';
import { getEnumNameByValue } from '@shared/helpers/get-enum-name-by-value';

@Component({
  selector: 'sva-tasks-table',
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
    AccentButton,
    PlusCircleIcon,
  ],
  templateUrl: './tasks-table.html',
})
export class TasksTable implements OnInit, OnDestroy {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  private readonly destroy$ = new Subject<void>();
  private readonly tasksService = inject(TasksService);
  private readonly notificationsService = inject(NotificationsService);
  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);

  ButtonBehaviour = ButtonBehaviour;
  ButtonType = ButtonType;
  LoaderSize = LoaderSize;
  TableModifier = TableModifier;
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
      next: taskCreated => {
        this.getTasks();
        this.notificationsService.showSuccess(
          `Task #${taskCreated.id} created successfully`
        );
      },
      error: error => {
        this.notificationsService.showError(error.message);
      },
    });
  }

  cancelTask(taskId: number): void {
    this.tasksService.cancelTask(taskId).subscribe({
      next: () => {
        this.getTasks();
        this.notificationsService.showSuccess(
          `Task #${taskId} cancelled successfully`
        );
      },
      error: error => {
        this.notificationsService.showError(error.message);
      },
    });
  }

  cancelTaskEdition(): void {
    this.taskToEdit.set(null);
    this.startAtDate.set(null);
    this.closeModal();
  }

  runTask(taskId: number): void {
    this.tasksService
      .runTask(taskId)
      .pipe(
        finalize(() => {
          this.getTasks();
        })
      )
      .subscribe({
        next: () => {
          this.notificationsService.showSuccess(
            `Task #${taskId} completed successfully`
          );
        },
        error: error => {
          this.notificationsService.showError(error.message);
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

    this.tasksService
      .updateTask(updatedTask)
      .pipe(
        finalize(() => {
          this.getTasks();
          this.taskToEdit.set(null);
          this.startAtDate.set(null);
          this.closeModal();
        })
      )
      .subscribe({
        next: updatedTask => {
          if (updatedTask.startAt && updatedTask.startAt < new Date()) {
            this.tasksService
              .runTask(updatedTask.id)
              .pipe(
                finalize(() => {
                  this.getTasks();
                })
              )
              .subscribe({
                next: () => {
                  console.log('Task execution simulated successfully');
                  this.notificationsService.showSuccess(
                    `Task #${updatedTask.id} completed successfully`
                  );
                },
                error: error => {
                  this.notificationsService.showError(error.message);
                },
              });
          }
        },
        error: error => {
          this.notificationsService.showError(error.message);
        },
      });
  }

  getBadgeColorByPriority(priority: number): BadgeColor {
    switch (priority) {
      case Priority.High:
        return BadgeColor.Red;
      case Priority.Medium:
        return BadgeColor.Yellow;
      case Priority.Low:
        return BadgeColor.Green;
      default:
        return BadgeColor.Neutral;
    }
  }

  getBadgeColorByStatus(status: number): BadgeColor {
    switch (status) {
      case Status.New:
        return BadgeColor.Neutral;
      case Status.InProgress:
        return BadgeColor.Blue;
      case Status.Completed:
        return BadgeColor.Green;
      case Status.Cancelled:
        return BadgeColor.Yellow;
      case Status.Blocked:
        return BadgeColor.Yellow;
      case Status.Failed:
        return BadgeColor.Red;
      default:
        return BadgeColor.Neutral;
    }
  }

  getPriorityNameByValue(priority: number): string {
    return getEnumNameByValue(Priority, priority);
  }

  getRelatedTaskNames(dependsOn: number[] | undefined): string {
    if (!dependsOn?.length) return '';
    return dependsOn.map(id => this.getTaskNameById(id)).join(', ');
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
    this.tasksService
      .getAllTasks()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: tasks => {
          this.tasksSubject.next(tasks);
        },
        error: error => {
          this.notificationsService.showError(error.message);
        },
      });
  }

  private getTaskNameById(id: number): string {
    const task = this.tasksSubject.value.find(t => t.id === id);
    return task ? `#${task.title}` : '';
  }

  private openModal(): void {
    this.modal.nativeElement.showModal();
  }
}
