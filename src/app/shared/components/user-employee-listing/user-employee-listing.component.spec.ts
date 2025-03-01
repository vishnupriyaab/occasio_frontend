import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmployeeListingComponent } from './user-employee-listing.component';

describe('UserEmployeeListingComponent', () => {
  let component: UserEmployeeListingComponent;
  let fixture: ComponentFixture<UserEmployeeListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEmployeeListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEmployeeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
