import { Observable, of, throwError, timer } from 'rxjs';
import { Injectable } from '@angular/core';
import { Priority } from '../../types/priority.enum';
import { Status } from '../../types/status.enum';
import { Task } from '../../types/task';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
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

    if (taskIndex !== -1) {
      const task = this.mockTasks[taskIndex];

      // Only allow cancellation if task is in progress
      if (task.status !== Status.InProgress) {
        throw new Error('Only tasks in progress can be cancelled');
      }

      const cancelledTask = {
        ...task,
        status: Status.Cancelled,
      };

      this.mockTasks[taskIndex] = cancelledTask;
      return of(cancelledTask);
    }

    throw new Error('Task not found');
  }

  getAllTasks(): Observable<Task[]> {
    return of(this.mockTasks);
  }

  restartTask(taskId: number): Observable<Task> {
    // Check if there are already 3 tasks running concurrently
    const runningTasks = this.mockTasks.filter(
      (t) => t.status === Status.InProgress,
    );
    if (runningTasks.length >= 3) {
      return throwError(
        () => new Error('Maximum of 3 tasks can run concurrently'),
      );
    }

    const taskIndex = this.mockTasks.findIndex((t) => t.id === taskId);

    if (taskIndex !== -1) {
      const task = this.mockTasks[taskIndex];

      const restartedTask = {
        ...task,
        status: Status.InProgress,
      };

      this.mockTasks[taskIndex] = restartedTask;
      return of(restartedTask);
    }

    throw new Error('Task not found');
  }

  simulateTaskExecution(taskId: number): Observable<Task> {
    console.warn('Simulating task execution for task ID:', taskId);
    const taskIndex = this.mockTasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      return throwError(() => new Error('Task not found'));
    }

    const task = this.mockTasks[taskIndex];

    const inProgressTask = {
      ...task,
      status: Status.InProgress,
      startAt: new Date(),
    };
    this.mockTasks[taskIndex] = inProgressTask;

    // Generate random delay between 1 and 14 seconds
    const delay = Math.floor(Math.random() * 14000) + 1000;

    // Check if task should fail due to timeout (delay is double of task duration)
    const shouldFailDueToTimeout = delay > (task.duration || 0) * 2;

    // Check if task should fail randomly (20% chance)
    const shouldFailRandomly = Math.random() < 0.2;

    return timer(delay).pipe(
      switchMap(() => {
        if (shouldFailDueToTimeout) {
          // Update task status to failed due to timeout
          const failedTask = {
            ...task,
            status: Status.Blocked,
            startAt: inProgressTask.startAt,
            attempts: inProgressTask.attempts + 1,
            blockREason: 'Task execution failed due to timeout',
          };

          this.mockTasks[taskIndex] = failedTask;
          return throwError(
            () => new Error('Task execution failed due to timeout'),
          );
        }

        if (shouldFailRandomly) {
          // Update task status to failed randomly
          const failedTask = {
            ...task,
            status: Status.Failed,
            startAt: inProgressTask.startAt,
            attempts: inProgressTask.attempts + 1,
          };

          if (failedTask.attempts >= 3) {
            failedTask.blockREason = 'Task execution failed after 3 attempts';
          }

          this.mockTasks[taskIndex] = failedTask;
          return throwError(() => new Error('Task execution failed randomly'));
        }

        // Update task status to completed
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

  updateTask(updatedTask: Task): Observable<Task> {
    const taskIndex = this.mockTasks.findIndex((t) => t.id === updatedTask.id);

    if (taskIndex !== -1) {
      const taskToUpdate = { ...updatedTask };
      if (taskToUpdate.startAt && taskToUpdate.startAt < new Date()) {
        // Check if there are already 3 tasks running concurrently
        const runningTasks = this.mockTasks.filter(
          (t) => t.status === Status.InProgress,
        );
        if (runningTasks.length >= 3) {
          return throwError(
            () => new Error('Maximum of 3 tasks can run concurrently'),
          );
        }

        taskToUpdate.status = Status.InProgress;
      }

      this.mockTasks[taskIndex] = taskToUpdate;
      return of(taskToUpdate);
    }

    throw new Error('Task not found');
  }
}
