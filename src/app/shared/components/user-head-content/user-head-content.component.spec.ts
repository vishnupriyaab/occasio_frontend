import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHeadContentComponent } from './user-head-content.component';

describe('UserHeadContentComponent', () => {
  let component: UserHeadContentComponent;
  let fixture: ComponentFixture<UserHeadContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHeadContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHeadContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
