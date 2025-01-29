import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAddEditComponent } from './event-add-edit.component';

describe('EventAddEditComponent', () => {
  let component: EventAddEditComponent;
  let fixture: ComponentFixture<EventAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
