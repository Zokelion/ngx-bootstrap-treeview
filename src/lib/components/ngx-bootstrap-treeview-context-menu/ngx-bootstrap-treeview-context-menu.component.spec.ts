import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBootstrapTreeviewContextMenuComponent } from './ngx-bootstrap-treeview-context-menu.component';

describe('NgxBootstrapTreeviewContextMenuComponent', () => {
  let component: NgxBootstrapTreeviewContextMenuComponent;
  let fixture: ComponentFixture<NgxBootstrapTreeviewContextMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxBootstrapTreeviewContextMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBootstrapTreeviewContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
