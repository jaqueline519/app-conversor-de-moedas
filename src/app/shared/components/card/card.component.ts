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
    console.log(this.currency?.bid)
    if(this.currency && this.currency.bid){
      if (this.currency.bid <= 1) {
        return 'color-red';
      } else if (this.currency.bid  <= 5) {
        return 'color-blue';
      } else {
        return 'color-green';
      }
    } else return ''
  }

}
