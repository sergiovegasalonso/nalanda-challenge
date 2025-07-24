import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Priority } from '../../types/priority.enum';
import { State } from '../../types/state.enum';
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
      state: State.New,
      dependsOn: [2, 3],
      startedAt: undefined,
      completedAt: undefined,
    },
    {
      id: 2,
      title: 'Title 2',
      description: 'Description for task 2',
      priority: Priority.Medium,
      state: State.New,
      dependsOn: [],
      startedAt: undefined,
      completedAt: undefined,
    },
    {
      id: 3,
      title: 'Title 3',
      description: 'Description for task 3',
      priority: Priority.Low,
      state: State.New,
      dependsOn: [],
      startedAt: undefined,
      completedAt: undefined,
    },
    {
      id: 4,
      title: 'Title 4',
      description: 'Description for task 4',
      priority: Priority.High,
      state: State.New,
      dependsOn: [1, 2],
      startedAt: undefined,
      completedAt: undefined,
    },
    {
      id: 5,
      title: 'Title 5',
      description: 'Description for task 5',
      priority: Priority.Medium,
      state: State.New,
      dependsOn: [],
      startedAt: undefined,
      completedAt: undefined,
    },
    {
      id: 6,
      title: 'Title 6',
      description: 'Description for task 6',
      priority: Priority.High,
      state: State.New,
      dependsOn: [7],
      startedAt: undefined,
      completedAt: undefined,
    },
    {
      id: 7,
      title: 'Title 7',
      description: 'Description for task 7',
      priority: Priority.Low,
      state: State.New,
      dependsOn: [],
      startedAt: undefined,
      completedAt: undefined,
    },
    {
      id: 8,
      title: 'Title 8',
      description: 'Description for task 8',
      priority: Priority.Medium,
      state: State.New,
      dependsOn: [],
      startedAt: undefined,
      completedAt: undefined,
    },
    {
      id: 9,
      title: 'Title 9',
      description: 'Description for task 9',
      priority: Priority.High,
      state: State.New,
      dependsOn: [],
      startedAt: undefined,
      completedAt: undefined,
    },
    {
      id: 10,
      title: 'Title 10',
      description: 'Description for task 10',
      priority: Priority.Low,
      state: State.New,
      dependsOn: [8, 9],
      startedAt: undefined,
      completedAt: undefined,
    },
  ];

  getAllTasks(): Observable<Task[]> {
    return of(this.mockTasks);
  }
}
