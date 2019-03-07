import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsingMapperComponent } from './using-mapper.component';

describe('UsingMapperComponent', () => {
  let component: UsingMapperComponent;
  let fixture: ComponentFixture<UsingMapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsingMapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsingMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
