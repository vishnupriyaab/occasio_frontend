import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrimaryBgComponent } from './user-primary-bg.component';

describe('UserPrimaryBgComponent', () => {
  let component: UserPrimaryBgComponent;
  let fixture: ComponentFixture<UserPrimaryBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPrimaryBgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPrimaryBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
