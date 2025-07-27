import { Observable, Subject, of, throwError, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Priority } from '../../types/priority.enum';
import { Status } from '../../types/status.enum';
import { Task } from '../../types/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly MAX_CONCURRENT_TASKS = 3;
  private readonly MAX_TASK_ATTEMPTS = 3;
  private readonly MAX_TASK_DURATION = 14000;
  private readonly MIN_TASK_DURATION = 1000;

  private readonly cancellationSubjects = new Map<number, Subject<void>>();

  private readonly mockTasks: Task[] = [
    {
      id: 1,
      title: 'Title 1',
      description: 'Description for task 1',
      priority: Priority.High,
      status: Status.New,
      dependsOn: [2, 3],
      startAt: undefined,
      completedAt: undefined,
      duration: 7000,
      attempts: 0,
    },
    {
      id: 2,
      title: 'Title 2',
      description: 'Description for task 2',
      priority: Priority.Medium,
      status: Status.New,
      dependsOn: [],
      startAt: undefined,
      completedAt: undefined,
      duration: 5000,
      attempts: 0,
    },
    {
      id: 3,
      title: 'Title 3',
      description: 'Description for task 3',
      priority: Priority.Low,
      status: Status.New,
      dependsOn: [],
      startAt: undefined,
      completedAt: undefined,
      duration: 3000,
      attempts: 0,
    },
    {
      id: 4,
      title: 'Title 4',
      description: 'Description for task 4',
      priority: Priority.High,
      status: Status.New,
      dependsOn: [1, 2],
      startAt: undefined,
      completedAt: undefined,
      duration: 7000,
      attempts: 0,
    },
    {
      id: 5,
      title: 'Title 5',
      description: 'Description for task 5',
      priority: Priority.Medium,
      status: Status.New,
      dependsOn: [],
      startAt: undefined,
      completedAt: undefined,
      duration: 5000,
      attempts: 0,
    },
    {
      id: 6,
      title: 'Title 6',
      description: 'Description for task 6',
      priority: Priority.High,
      status: Status.New,
      dependsOn: [7],
      startAt: undefined,
      completedAt: undefined,
      duration: 6000,
      attempts: 0,
    },
    {
      id: 7,
      title: 'Title 7',
      description: 'Description for task 7',
      priority: Priority.Low,
      status: Status.New,
      dependsOn: [],
      startAt: undefined,
      completedAt: undefined,
      duration: 4000,
      attempts: 0,
    },
    {
      id: 8,
      title: 'Title 8',
      description: 'Description for task 8',
      priority: Priority.Medium,
      status: Status.New,
      dependsOn: [],
      startAt: undefined,
      completedAt: undefined,
      duration: 2000,
      attempts: 0,
    },
    {
      id: 9,
      title: 'Title 9',
      description: 'Description for task 9',
      priority: Priority.High,
      status: Status.New,
      dependsOn: [],
      startAt: undefined,
      completedAt: undefined,
      duration: 1000,
      attempts: 0,
    },
    {
      id: 10,
      title: 'Title 10',
      description: 'Description for task 10',
      priority: Priority.Low,
      status: Status.New,
      dependsOn: [8, 9],
      startAt: undefined,
      completedAt: undefined,
      duration: 5000,
      attempts: 0,
    },
  ];

  addRandomTask(): Observable<Task> {
    const priorities = [Priority.Low, Priority.Medium, Priority.High];

    const existingIds = this.mockTasks.map((task) => task.id);
    const newId = Math.max(...existingIds) + 1;

    const randomTask: Task = {
      id: newId,
      title: `Title ${newId}`,
      description: `Description for task ${newId}`,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status: Status.New,
      dependsOn:
        Math.random() > 0.7
          ? [existingIds[Math.floor(Math.random() * existingIds.length)]]
          : [],
      startAt: undefined,
      completedAt: undefined,
      attempts: 0,
    };

    this.mockTasks.push(randomTask);

    return of(randomTask);
  }

  cancelTask(taskId: number): Observable<Task> {
    const taskIndex = this.mockTasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      return throwError(() => new Error(`Task ${taskId} not found`));
    }

    const task = this.mockTasks[taskIndex];

    if (task.status !== Status.InProgress) {
      throw new Error('Only tasks in progress can be cancelled');
    }

    const cancellationSubject = this.cancellationSubjects.get(taskId);
    if (cancellationSubject) {
      cancellationSubject.next();
      cancellationSubject.complete();
      this.cancellationSubjects.delete(taskId);
    }

    const cancelledTask = {
      ...task,
      status: Status.Cancelled,
    };

    this.mockTasks[taskIndex] = cancelledTask;
    return of(cancelledTask);
  }

  getAllTasks(): Observable<Task[]> {
    return of(this.mockTasks);
  }

  runTask(taskId: number): Observable<Task> {
    const runningTasks = this.mockTasks.filter(
      (t) => t.status === Status.InProgress,
    );

    if (runningTasks.length >= this.MAX_CONCURRENT_TASKS) {
      return throwError(
        () =>
          new Error(
            `Maximum of ${this.MAX_CONCURRENT_TASKS} tasks can run concurrently`,
          ),
      );
    }

    const taskIndex = this.mockTasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      return throwError(() => new Error(`Task ${taskId} not found`));
    }

    const targetTask = this.mockTasks[taskIndex];

    const allDependenciesCompleted =
      !targetTask.dependsOn?.length ||
      targetTask.dependsOn.every(
        (depId) =>
          this.mockTasks.find((t) => t.id === depId)?.status ===
          Status.Completed,
      );

    if (!allDependenciesCompleted) {
      return throwError(
        () =>
          new Error(
            `Task ${taskId} cannot be started due to incomplete dependencies`,
          ),
      );
    }

    const task = this.mockTasks[taskIndex];

    const inProgressTask = {
      ...task,
      status: Status.InProgress,
      startAt: new Date(),
    };
    this.mockTasks[taskIndex] = inProgressTask;

    const cancellationSubject = new Subject<void>();
    this.cancellationSubjects.set(taskId, cancellationSubject);

    const delay =
      Math.floor(Math.random() * this.MAX_TASK_DURATION) +
      this.MIN_TASK_DURATION;
    const shouldFailDueToTimeout = delay > (task.duration || 0) * 2;
    const shouldFailRandomly = Math.random() < 0.2;

    return timer(delay).pipe(
      takeUntil(cancellationSubject),
      switchMap(() => {
        this.cancellationSubjects.delete(taskId);

        if (shouldFailDueToTimeout) {
          const failedTask = {
            ...task,
            status: Status.Blocked,
            startAt: inProgressTask.startAt,
            attempts: inProgressTask.attempts + 1,
            blockReason: 'Task execution failed due to timeout',
          };

          this.mockTasks[taskIndex] = failedTask;

          return throwError(
            () => new Error(`Task ${task.id} execution failed due to timeout`),
          );
        }

        if (shouldFailRandomly) {
          const failedTask = {
            ...task,
            status: Status.Failed,
            startAt: inProgressTask.startAt,
            attempts: inProgressTask.attempts + 1,
          };

          if (failedTask.attempts >= this.MAX_TASK_ATTEMPTS) {
            failedTask.blockReason = 'Task execution failed after 3 attempts';
          }

          this.mockTasks[taskIndex] = failedTask;

          return throwError(
            () => new Error(`Task ${task.id} execution failed randomly`),
          );
        }

        const completedTask = {
          ...task,
          status: Status.Completed,
          startAt: inProgressTask.startAt,
          completedAt: new Date(),
        };
        this.mockTasks[taskIndex] = completedTask;

        return of(completedTask);
      }),
    );
  }

  updateTask(task: Task): Observable<Task> {
    const taskIndex = this.mockTasks.findIndex((t) => t.id === task.id);

    if (taskIndex === -1) {
      return throwError(() => new Error(`Task ${task.id} not found`));
    }

    this.mockTasks[taskIndex] = task;

    return of(task);
  }
}
