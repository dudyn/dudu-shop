import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrzedtreningowkiComponent } from './przedtreningowki.component';

describe('PrzedtreningowkiComponent', () => {
  let component: PrzedtreningowkiComponent;
  let fixture: ComponentFixture<PrzedtreningowkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrzedtreningowkiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrzedtreningowkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
