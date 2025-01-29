import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindWordsComponent } from './kind-words.component';

describe('KindWordsComponent', () => {
  let component: KindWordsComponent;
  let fixture: ComponentFixture<KindWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KindWordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KindWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
