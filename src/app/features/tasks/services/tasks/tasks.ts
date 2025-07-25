import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Priority } from '../../types/priority.enum';
import { Status } from '../../types/status.enum';
import { Task } from '../../types/task';

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

  updateTask(updatedTask: Task): Observable<Task> {
    const taskIndex = this.mockTasks.findIndex((t) => t.id === updatedTask.id);

    if (taskIndex !== -1) {
      const taskToUpdate = { ...updatedTask };
      if (taskToUpdate.startAt && taskToUpdate.startAt < new Date()) {
        taskToUpdate.status = Status.InProgress;
      }

      this.mockTasks[taskIndex] = taskToUpdate;
      return of(taskToUpdate);
    }

    throw new Error('Task not found');
  }
}
