import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'; // Add this line

import { QuotationsService } from './quotations.service';
import { HttpClientModule } from '@angular/common/http';
import { currenciesMock } from '../../mocks-tests/mock-currencies';

describe('QuotationsService', () => {
  let service: QuotationsService;
  let httpMock: HttpTestingController; // Add this line

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuotationsService],
    });
    service = TestBed.inject(QuotationsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return quotations data', () => {
    const currency = 'CAD-BRL,ARS-BRL,GBP-BRL';
    const mockData = currenciesMock;

    service.getQuotations(currency).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(
      `https://economia.awesomeapi.com.br/last/${currency}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
