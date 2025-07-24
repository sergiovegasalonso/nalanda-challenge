import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Heading1 } from './heading-1';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Heading1', () => {
  let component: Heading1;
  let fixture: ComponentFixture<Heading1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [Heading1],
    }).compileComponents();

    fixture = TestBed.createComponent(Heading1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
