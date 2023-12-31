import {
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  inject,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CardComponent } from '../shared/components/card/card.component';
import { CurrencyModel } from '../shared/models/currency.model';
import {
  Subscription,
  catchError,
  switchMap,
  throwError,
} from 'rxjs';
import { LoadingService } from '../shared/services/loading/loading.service';
import { QuotationsService } from '../shared/services/quatations/quotations.service';
import { CommonModule } from '@angular/common';
import {
  classesKey,
  currenciesKey,
  namesKey,
} from '../shared/dictionaries/dictionary';
@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule, CardComponent],
  providers: [QuotationsService, LoadingService],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotesComponent implements OnInit, OnDestroy {
  dolarCanadense: CurrencyModel | any;
  pesoArgentino: CurrencyModel | any;
  libraEsterlina: CurrencyModel | any;
  errorQuotations: boolean = false;
  currencies: { [key: string]: CurrencyModel } = currenciesKey;
  classes: { [key: string]: any } = classesKey;
  names: { [key: string]: any } = namesKey;
  date: any;
  timer$: Subscription = new Subscription();

  constructor(
    private quatationsService: QuotationsService,
    private changeDetection: ChangeDetectorRef,
    private loadingService: LoadingService
  ) {
    inject(NgZone).runOutsideAngular(() => {
      this.toUpdateQuatation();
    });
  }

  ngOnInit(): void {
    this.loadingService.showLoading();
  }

  getQuotation() {
    this.loadingService.showLoading();
    this.quatationsService
      .getQuotations('CAD-BRL,ARS-BRL,GBP-BRL')
      .pipe(
        catchError((error) => {
          this.loadingService.hideLoading();
          if (error) {
            this.errorQuotations = true;
            this.changeDetection.detectChanges();
          }
          return throwError(() => error);
        })
      )
      .subscribe((response: any) => {
        this.loadingService.hideLoading();
        this.date = this.quatationsService.getLastUpdate();
        this.returnObjectsCurrencies(response);
      });
  }

  toUpdateQuatation() {
    this.loadingService.showLoading();
    this.timer$ = this.quatationsService.timer$
      .pipe(
        switchMap(() =>
          this.quatationsService.getQuotations('CAD-BRL,ARS-BRL,GBP-BRL')
        )
      )
      .pipe(
        catchError((error) => {
          if (error) {
            this.errorQuotations = true;
            this.loadingService.hideLoading();
            this.changeDetection.detectChanges();
          }
          return throwError(() => error);
        })
      )
      .subscribe((response) => {
        this.loadingService.hideLoading();
        this.date = this.quatationsService.getLastUpdate();
        this.returnObjectsCurrencies(response);
      });
  }

  returnObjectsCurrencies(objectCurrency: any) {
    this.currencies['CAD-BRL'] = objectCurrency['CADBRL'];
    this.currencies['ARS-BRL'] = objectCurrency['ARSBRL'];
    this.currencies['GBP-BRL'] = objectCurrency['GBPBRL'];
    this.changeDetection.detectChanges();
  }

  ngOnDestroy(): void {
    this.timer$.unsubscribe();
  }
}
