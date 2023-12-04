import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { ColorsPipe } from '../../pipes/colors.pipe';
import { LoadingService } from '../../services/loading/loading.service';
import { CurrencyModel } from '../../models/currency.model';
import { currenciesMock } from '../../mocks-tests/mock-currencies';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, CurrencyPipe, DatePipe, NgClass, ColorsPipe],
      providers: [LoadingService],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the currency input', () => {
    const currency: CurrencyModel = currenciesMock['CAD-BRL'];
    component.currency = currency;
    fixture.detectChanges();
    expect(component.currency).toEqual(currenciesMock['CAD-BRL']);
  });
});
