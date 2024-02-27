import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KreatynyComponent } from './kreatyny.component';

describe('KreatynyComponent', () => {
  let component: KreatynyComponent;
  let fixture: ComponentFixture<KreatynyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KreatynyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KreatynyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
