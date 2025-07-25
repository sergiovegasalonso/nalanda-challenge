import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowPath } from './arrow-path';

describe('ArrowPath', () => {
  let component: ArrowPath;
  let fixture: ComponentFixture<ArrowPath>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowPath],
    }).compileComponents();

    fixture = TestBed.createComponent(ArrowPath);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
