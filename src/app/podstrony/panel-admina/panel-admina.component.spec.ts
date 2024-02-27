import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAdminaComponent } from './panel-admina.component';

describe('PanelAdminaComponent', () => {
  let component: PanelAdminaComponent;
  let fixture: ComponentFixture<PanelAdminaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelAdminaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelAdminaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
