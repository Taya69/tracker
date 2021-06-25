import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneOfTaskComponent } from './one-of-task.component';

describe('OneOfTaskComponent', () => {
  let component: OneOfTaskComponent;
  let fixture: ComponentFixture<OneOfTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneOfTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneOfTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
