import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageMoreInfoComponent } from './package-more-info.component';

describe('PackageMoreInfoComponent', () => {
  let component: PackageMoreInfoComponent;
  let fixture: ComponentFixture<PackageMoreInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageMoreInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageMoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
