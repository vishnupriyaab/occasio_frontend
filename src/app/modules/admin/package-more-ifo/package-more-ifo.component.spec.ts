import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageMoreIfoComponent } from './package-more-ifo.component';

describe('PackageMoreIfoComponent', () => {
  let component: PackageMoreIfoComponent;
  let fixture: ComponentFixture<PackageMoreIfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageMoreIfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageMoreIfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
