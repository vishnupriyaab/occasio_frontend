import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScndNavComponent } from './user-scnd-nav.component';

describe('UserScndNavComponent', () => {
  let component: UserScndNavComponent;
  let fixture: ComponentFixture<UserScndNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserScndNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserScndNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
