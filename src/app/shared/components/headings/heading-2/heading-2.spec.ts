import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Heading2 } from './heading-2';

describe('Heading2', () => {
  let component: Heading2;
  let fixture: ComponentFixture<Heading2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
