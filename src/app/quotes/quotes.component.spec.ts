import { currenciesMock } from './../shared/mocks-tests/mock-currencies';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CardComponent } from '../shared/components/card/card.component';
import { HttpClientModule } from '@angular/common/http';

import { QuotesComponent } from './quotes.component';
import { QuotationsService } from '../shared/services/quatations/quotations.service';
import { LoadingService } from '../shared/services/loading/loading.service';
import { subscribe } from 'diagnostics_channel';

describe('QuotesComponent', () => {
  let component: QuotesComponent;
  let fixture: ComponentFixture<QuotesComponent>;
  let quotationsServiceMock: Partial<QuotationsService>;
  let loadingServiceMock: Partial<LoadingService>;
  let unsubscribeMock: jest.Mock;

  beforeEach(() => {
    quotationsServiceMock = {
      getQuotations: jest.fn().mockReturnValue(of(currenciesMock)),
      getLastUpdate: jest.fn().mockReturnValue('2023-02-02 12:30:20'),
    };

    loadingServiceMock = {
      showLoading: jest.fn().mockReturnValue(of(true)),
      hideLoading: jest.fn().mockReturnValue(of(false)),
    };

    TestBed.configureTestingModule({
      imports: [QuotesComponent, CardComponent, HttpClientModule],
      providers: [
        { provide: QuotationsService, useValue: quotationsServiceMock },
        { provide: LoadingService, useValue: loadingServiceMock },
      ],
    });

    unsubscribeMock = jest.fn();
    fixture = TestBed.createComponent(QuotesComponent);
    component = fixture.componentInstance;
    component['subscription'] = { unsubscribe: unsubscribeMock } as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('must set errorQuotations not failed getQuotations', () => {
    jest
      .spyOn(quotationsServiceMock, 'getQuotations')
      .mockReturnValue(of(subscribe));

    component.ngOnInit();

    expect(component.errorQuotations).toBe(false);
  });

  it('should assign values to currencies object and call changeDetection', () => {
    const objectCurrency = {
      CADBRL: currenciesMock['CAD-BRL'],
      ARSBRL: currenciesMock['ARS-BRL'],
      GBPBRL: currenciesMock['GBP-BRL'],
    };

    component.returnObjectsCurrencies(objectCurrency);

    expect(component.currencies['CAD-BRL']).toBe(currenciesMock['CAD-BRL']);
    expect(component.currencies['ARS-BRL']).toBe(currenciesMock['ARS-BRL']);
    expect(component.currencies['GBP-BRL']).toBe(currenciesMock['GBP-BRL']);
  });

  it('should unsubscribe on ngOnDestroy', () => {
    component.ngOnDestroy();

    expect(unsubscribeMock).toHaveBeenCalled();
  });
});
