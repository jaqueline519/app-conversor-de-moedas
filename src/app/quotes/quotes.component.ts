import { Component, NgZone, OnDestroy, OnInit, inject, ChangeDetectorRef, ChangeDetectionStrategy  } from '@angular/core';
import { CardComponent } from '../shared/components/card/card.component';
import { CurrencyModel } from '../shared/models/currency.model';
import { Observable, Subscription, catchError, switchMap, throwError, timer } from 'rxjs';
import { LoadingService } from '../shared/services/loading/loading.service';
import { QuotationsService } from '../shared/services/quatations/quotations.service';
@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesComponent implements OnInit, OnDestroy {

  dolarCanadense: CurrencyModel | any
  pesoArgentino: CurrencyModel | any
  libraEsterlina: CurrencyModel | any
  errorQuatations: boolean = false
  private subscription: Subscription = new Subscription()
  timer$: Observable<number> = timer(180000, 180000)

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
    this.getQuatation()
  }

  getQuatation() {
    this.loadingService.showLoading()
    this.errorQuatations = true
    this.quatationsService.getQuotations(`CAD-BRL,ARS-BRL,GBP-BRL`)
    .pipe(
      catchError(error => {
        this.loadingService.hideLoading()
        if(error){
          this.errorQuatations = true
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

  formatText(currency: CurrencyModel) {
    const name = currency.name;
    const splitName = name?.split('/')
    return splitName ? splitName[0] : ''
  }

  toUpdateQuatation() {
    this.loadingService.showLoading()
    this.subscription = this.timer$.pipe(
      switchMap(() => this.quatationsService.getQuotations(`CAD-BRL,ARS-BRL,GBP-BRL`)),
    )
    .pipe(
      catchError(error => {
        if(error){
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
    this.dolarCanadense = { ...objectCurrency['CADBRL'], name: this.formatText(objectCurrency['CADBRL']) }
    this.pesoArgentino = { ...objectCurrency['ARSBRL'], name: this.formatText(objectCurrency['ARSBRL']) }
    this.libraEsterlina = { ...objectCurrency['GBPBRL'], name: this.formatText(objectCurrency['GBPBRL']) }
    this.changeDetection.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
