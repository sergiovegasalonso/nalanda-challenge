import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArrowPathIcon } from './arrow-path-icon';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ArrowPathIcon', () => {
  let component: ArrowPathIcon;
  let fixture: ComponentFixture<ArrowPathIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [ArrowPathIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(ArrowPathIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
