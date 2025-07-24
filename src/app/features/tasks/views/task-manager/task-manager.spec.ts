import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskManager } from './task-manager';
import { provideZonelessChangeDetection } from '@angular/core';

describe('TaskManager', () => {
  let component: TaskManager;
  let fixture: ComponentFixture<TaskManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [TaskManager],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
