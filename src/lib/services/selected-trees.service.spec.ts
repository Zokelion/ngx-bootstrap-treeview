import { TestBed } from '@angular/core/testing';

import { SelectedTreesService } from './selected-trees.service';

describe('SelectedTreesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectedTreesService = TestBed.get(SelectedTreesService);
    expect(service).toBeTruthy();
  });
});
