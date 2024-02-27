import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WitaminyComponent } from './witaminy.component';

describe('WitaminyComponent', () => {
  let component: WitaminyComponent;
  let fixture: ComponentFixture<WitaminyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WitaminyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WitaminyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
