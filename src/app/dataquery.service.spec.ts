import { TestBed, inject } from '@angular/core/testing';

import { DataqueryService } from './dataquery.service';

describe('DataqueryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataqueryService]
    });
  });

  it('should be created', inject([DataqueryService], (service: DataqueryService) => {
    expect(service).toBeTruthy();
  }));
});
