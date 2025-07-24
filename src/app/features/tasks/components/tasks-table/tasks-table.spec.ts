import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TasksTable } from './tasks-table';

describe('TasksTable', () => {
  let component: TasksTable;
  let fixture: ComponentFixture<TasksTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [TasksTable],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize tasks and loading state', () => {
    expect(component.tasks()).toEqual([]);
    expect(component.loading()).toBe(false);
  });

  it('should call getTasks on ngOnInit', () => {
    const spy = spyOn(component, 'getTasks').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  it('should fetch tasks on getTasks', () => {
    const service = TestBed.inject(TasksTable);
    spyOn(service, 'getTasks').and.callThrough();
    service.getTasks();
    expect(service.tasks().length).toBeGreaterThan(0); // Assuming tasks are fetched
  });

  it('should return task name by id', () => {
    const service = TestBed.inject(TasksTable);
    expect(service.getTaskNameById(1)).toBe('Title 1');
    expect(service.getTaskNameById(999)).toBe('');
  });

  it('should return related task names', () => {
    const service = TestBed.inject(TasksTable);
    const dependsOn = [2, 3];
    const expected = 'Title 2, Title 3';
    expect(service.getRelatedTaskNames(dependsOn)).toBe(expected);
  });
});
