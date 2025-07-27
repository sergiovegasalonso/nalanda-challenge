import { Priority } from '../types/priority.enum';
import { Status } from '../types/status.enum';
import { Task } from '../types/task';
import { TasksService } from './tasks';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Tasks', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all tasks', async () => {
    const tasks = await firstValueFrom(service.getAllTasks());
    expect(tasks).toBeTruthy();
    expect(tasks.length).toBe(10);
  });

  it('should return tasks with correct structure', async () => {
    const tasks = await firstValueFrom(service.getAllTasks());
    const firstTask = tasks[0];

    expect(firstTask).toEqual({
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
    });
  });

  it('should return tasks with valid priorities', async () => {
    const tasks = await firstValueFrom(service.getAllTasks());
    const validPriorities = Object.values(Priority);

    tasks.forEach((task: Task) => {
      expect(validPriorities).toContain(task.priority);
    });
  });

  it('should return tasks with valid states', async () => {
    const tasks = await firstValueFrom(service.getAllTasks());
    const validStatuses = Object.values(Status);

    tasks.forEach((task: Task) => {
      expect(validStatuses).toContain(task.status);
    });
  });
});
