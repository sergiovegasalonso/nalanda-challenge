import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Heading2 } from './heading-2';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Heading2', () => {
  let component: Heading2;
  let fixture: ComponentFixture<Heading2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [Heading2],
    }).compileComponents();

    fixture = TestBed.createComponent(Heading2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
