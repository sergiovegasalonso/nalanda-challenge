import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakLine } from './break-line';
import { provideZonelessChangeDetection } from '@angular/core';

describe('BreakLine', () => {
  let component: BreakLine;
  let fixture: ComponentFixture<BreakLine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [BreakLine],
    }).compileComponents();

    fixture = TestBed.createComponent(BreakLine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
