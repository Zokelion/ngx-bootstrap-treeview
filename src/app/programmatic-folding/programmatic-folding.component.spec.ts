import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammaticFoldingComponent } from './programmatic-folding.component';

describe('ProgrammaticFoldingComponent', () => {
  let component: ProgrammaticFoldingComponent;
  let fixture: ComponentFixture<ProgrammaticFoldingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammaticFoldingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammaticFoldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
