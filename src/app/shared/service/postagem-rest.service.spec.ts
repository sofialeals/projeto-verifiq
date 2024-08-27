import { TestBed } from '@angular/core/testing';

import { PostagemRestService } from './postagem-rest.service';

describe('PostagemRestService', () => {
  let service: PostagemRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostagemRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
