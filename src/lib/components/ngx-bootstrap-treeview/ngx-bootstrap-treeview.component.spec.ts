import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBootstrapTreeviewComponent } from './ngx-bootstrap-treeview.component';

describe('NgxBootstrapTreeviewComponent', () => {
  let component: NgxBootstrapTreeviewComponent;
  let fixture: ComponentFixture<NgxBootstrapTreeviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxBootstrapTreeviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBootstrapTreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
