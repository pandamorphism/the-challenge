import { TestBed } from '@angular/core/testing';

import { InterpreterService } from './interpreter.service';
import {HttpClientModule} from '@angular/common/http';

describe('InterpreterService', () => {
  let service: InterpreterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(InterpreterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
