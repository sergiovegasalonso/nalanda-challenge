import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Paragraph } from './paragraph';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Paragraph', () => {
  let component: Paragraph;
  let fixture: ComponentFixture<Paragraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [Paragraph],
    }).compileComponents();

    fixture = TestBed.createComponent(Paragraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
