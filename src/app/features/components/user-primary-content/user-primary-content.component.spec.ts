import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrimaryContentComponent } from './user-primary-content.component';

describe('UserPrimaryContentComponent', () => {
  let component: UserPrimaryContentComponent;
  let fixture: ComponentFixture<UserPrimaryContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPrimaryContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPrimaryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
