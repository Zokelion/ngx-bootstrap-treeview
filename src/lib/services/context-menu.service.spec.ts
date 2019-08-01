import { TestBed } from '@angular/core/testing';

import { ContextMenuService } from './context-menu.service';

describe('ContextMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContextMenuService = TestBed.get(ContextMenuService);
    expect(service).toBeTruthy();
  });
});
