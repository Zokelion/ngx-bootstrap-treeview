import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultirootTreeComponent } from './multiroot-tree.component';

describe('MultirootTreeComponent', () => {
  let component: MultirootTreeComponent;
  let fixture: ComponentFixture<MultirootTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultirootTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultirootTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
