import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomStylingComponent } from './custom-styling.component';

describe('CustomStylingComponent', () => {
  let component: CustomStylingComponent;
  let fixture: ComponentFixture<CustomStylingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomStylingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomStylingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
