import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesComponent } from './quotes.component';
import { QuotationsService } from '../shared/services/quatations/quotations.service';
import { LoadingService } from '../shared/services/loading/loading.service';
import { of } from 'rxjs';
import { CardComponent } from '../shared/components/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { afterEach } from 'node:test';
import { currenciesMock } from '../shared/mocks-tests/mock-currencies';

describe('QuotesComponent', () => {
  let component: QuotesComponent
  let fixture: ComponentFixture<QuotesComponent>
  let quotationsServiceMock: Partial<QuotationsService>
  let loadingServiceMock: Partial<LoadingService>

  beforeEach(() => {
    quotationsServiceMock = {
      getQuotations: jest.fn().mockReturnValue(of({ CADBRL: currenciesMock['CAD-BRL'], ARSBRL: currenciesMock['ARS-BRL'], GBPBRL: currenciesMock })),
      getLastUpdate: jest.fn().mockReturnValue(() => '2021-12-05 12:30:20'),
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

    fixture = TestBed.createComponent(QuotesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should get quotations and update currencies', () => {

    component.ngOnInit();

    expect(loadingServiceMock.showLoading).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.ngOnInit).toHaveBeenCalled();

  });

  afterEach(() => {
    fixture.destroy();
  });
});
