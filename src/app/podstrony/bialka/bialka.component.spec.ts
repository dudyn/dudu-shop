import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BialkaComponent } from './bialka.component';

describe('BialkaComponent', () => {
  let component: BialkaComponent;
  let fixture: ComponentFixture<BialkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BialkaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BialkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
