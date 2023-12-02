import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CurrencyModel } from '../../models/currency.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass'
})
export class CardComponent implements OnInit {

  @Input() currency: CurrencyModel | undefined;
  classColor: string = ''

  ngOnInit(): void {
    this.classColor = this.getColorValue()
  }

  getColorValue(): string{
    if(!(this.currency && this.currency.bid)) return 'color-gray'

    const lowValue = this.currency.bid <= 1
    const midiumValue = this.currency.bid <= 5
    const highValue =  this.currency.bid > 5

    if(lowValue) return 'color-red'
    if(midiumValue) return 'color-blue'
    if(highValue) return 'color-green'

    return 'color-gray'
  }

}
