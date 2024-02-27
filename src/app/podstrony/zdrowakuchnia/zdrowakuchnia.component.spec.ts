import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZdrowakuchniaComponent } from './zdrowakuchnia.component';

describe('ZdrowakuchniaComponent', () => {
  let component: ZdrowakuchniaComponent;
  let fixture: ComponentFixture<ZdrowakuchniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZdrowakuchniaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZdrowakuchniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
