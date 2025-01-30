import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManagementAdminComponent } from './event-management-admin.component';

describe('EventManagementAdminComponent', () => {
  let component: EventManagementAdminComponent;
  let fixture: ComponentFixture<EventManagementAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventManagementAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventManagementAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
