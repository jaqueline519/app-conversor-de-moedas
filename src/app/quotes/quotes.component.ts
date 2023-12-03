import { Component, NgZone, OnDestroy, OnInit, inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CardComponent } from '../shared/components/card/card.component';
import { CurrencyModel } from '../shared/models/currency.model';
import { Observable, Subscription, catchError, switchMap, throwError, timer } from 'rxjs';
import { LoadingService } from '../shared/services/loading/loading.service';
import { QuotationsService } from '../shared/services/quatations/quotations.service';
import { CommonModule } from '@angular/common';
import { classesKey, currenciesKey, namesKey } from '../shared/dictionaries/dictionary';
@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesComponent implements OnInit, OnDestroy {

  dolarCanadense: CurrencyModel | any
  pesoArgentino: CurrencyModel | any
  libraEsterlina: CurrencyModel | any
  errorQuotations: boolean = false
  private subscription: Subscription = new Subscription()
  timer$: Observable<number> = timer(180000, 180000)
  currencies: { [key: string]: CurrencyModel } = currenciesKey
  classes: { [key: string]: any } = classesKey
  names: { [key: string]: any } = namesKey

  constructor(
    private quatationsService: QuotationsService,
    private changeDetection: ChangeDetectorRef,
    private loadingService: LoadingService
  ) {
    inject(NgZone).runOutsideAngular(() => {
      this.toUpdateQuatation()
    })
  }

  ngOnInit(): void {
    this.loadingService.showLoading()
    this.getQuotation()
  }

  getQuotation() {
    this.loadingService.showLoading()
    this.errorQuotations = true
    this.quatationsService.getQuotations('CAD-BRL,ARS-BRL,GBP-BRL')
      .pipe(
        catchError(error => {
          this.loadingService.hideLoading()
          if (error) {
            this.errorQuotations = true
            this.changeDetection.detectChanges()
          }
          return throwError(() => error)
        })
      )
      .subscribe((response: any) => {
        this.loadingService.hideLoading()
        this.returnObjectsCurrencys(response)
      })
  }

  toUpdateQuatation() {
    this.loadingService.showLoading()
    this.subscription = this.timer$.pipe(
      switchMap(() => this.quatationsService.getQuotations('CAD-BRL,ARS-BRL,GBP-BRL')),
    )
      .pipe(
        catchError(error => {
          if (error) {
            this.loadingService.hideLoading()
            this.changeDetection.detectChanges()
          }
          return throwError(() => error)
        })
      )
      .subscribe(response => {
        this.loadingService.hideLoading()
        this.returnObjectsCurrencys(response)
      })
  }

  returnObjectsCurrencys(objectCurrency: any) {
    this.currencies['CAD-BRL'] = objectCurrency['CADBRL']
    this.currencies['ARS-BRL'] = objectCurrency['ARSBRL']
    this.currencies['GBP-BRL'] = objectCurrency['GBPBRL']
    this.changeDetection.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
