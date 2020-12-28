import { TestBed } from '@angular/core/testing';

import { WebStorageLocalService } from './web-storage-local.service';

describe('WebStorageLocalService', () => {
  let service: WebStorageLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebStorageLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
