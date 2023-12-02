import { Component, NgZone, OnDestroy, OnInit, inject, ChangeDetectorRef, ChangeDetectionStrategy  } from '@angular/core';
import { CardComponent } from '../shared/components/card/card.component';
import { QuotationsService } from '../shared/services/quotations.service';
import { CurrencyModel } from '../shared/models/currency.model';
import { Observable, Subscription, switchMap, timer } from 'rxjs';
@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesComponent implements OnInit, OnDestroy {

  dolarCanadense: CurrencyModel | any;
  pesoArgentino: CurrencyModel | any;
  libraEsterlina: CurrencyModel | any;
  private subscription: Subscription = new Subscription()
  timer$: Observable<number> = timer(180000, 180000);

  constructor(
    private quatationsService: QuotationsService,
    private changeDetection: ChangeDetectorRef
  ) {
    inject(NgZone).runOutsideAngular(() => {
    this.toUpdateQuatation()
    })

  }
  ngOnInit(): void {
    this.getQuatation()
  }

  getQuatation() {
    this.quatationsService.getQuotations('CAD-BRL,ARS-BRL,GBP-BRL')
      .subscribe(response => {
        this.returnObjectsCurrencys(response)
      })
  }

  formatText(currency: CurrencyModel) {
    const name = currency.name;
    const splitName = name?.split('/')
    return splitName ? splitName[0] : ''
  }

  toUpdateQuatation() {
    this.subscription = this.timer$.pipe(
      switchMap(() => this.quatationsService.getQuotations(`CAD-BRL,ARS-BRL,GBP-BRL`)),
    ).subscribe(response => {
      this.returnObjectsCurrencys(response)
      this.changeDetection.detectChanges();
    })
  }

  returnObjectsCurrencys(objectCurrency: any) {
    this.dolarCanadense = { ...objectCurrency['CADBRL'], name: this.formatText(objectCurrency['CADBRL']) }
    this.pesoArgentino = { ...objectCurrency['ARSBRL'], name: this.formatText(objectCurrency['ARSBRL']) }
    this.libraEsterlina = { ...objectCurrency['GBPBRL'], name: this.formatText(objectCurrency['GBPBRL']) }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
