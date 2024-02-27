import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdycjaProduktuComponent } from './edycja-produktu.component';

describe('EdycjaProduktuComponent', () => {
  let component: EdycjaProduktuComponent;
  let fixture: ComponentFixture<EdycjaProduktuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdycjaProduktuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdycjaProduktuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
