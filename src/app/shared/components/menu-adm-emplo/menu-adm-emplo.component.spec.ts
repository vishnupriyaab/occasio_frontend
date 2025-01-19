import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAdmEmploComponent } from './menu-adm-emplo.component';

describe('MenuAdmEmploComponent', () => {
  let component: MenuAdmEmploComponent;
  let fixture: ComponentFixture<MenuAdmEmploComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuAdmEmploComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuAdmEmploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
