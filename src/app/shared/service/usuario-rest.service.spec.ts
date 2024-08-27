import { TestBed } from '@angular/core/testing';

import { UsuarioRestService } from './usuario-rest.service';

describe('UsuarioRestService', () => {
  let service: UsuarioRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
