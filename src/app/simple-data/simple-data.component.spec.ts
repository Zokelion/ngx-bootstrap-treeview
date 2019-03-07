import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDataComponent } from './simple-data.component';

describe('SimpleDataComponent', () => {
  let component: SimpleDataComponent;
  let fixture: ComponentFixture<SimpleDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
