import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusCircleIcon } from './plus-circle-icon';

describe('PlusCircleIcon', () => {
  let component: PlusCircleIcon;
  let fixture: ComponentFixture<PlusCircleIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlusCircleIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(PlusCircleIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
