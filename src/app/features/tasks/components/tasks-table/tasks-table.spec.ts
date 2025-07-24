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
});
