import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrimaryNavComponent } from './user-primary-nav.component';

describe('UserPrimaryNavComponent', () => {
  let component: UserPrimaryNavComponent;
  let fixture: ComponentFixture<UserPrimaryNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPrimaryNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPrimaryNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
