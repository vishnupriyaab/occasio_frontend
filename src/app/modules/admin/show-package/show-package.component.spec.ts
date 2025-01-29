import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPackageComponent } from './show-package.component';

describe('ShowPackageComponent', () => {
  let component: ShowPackageComponent;
  let fixture: ComponentFixture<ShowPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
