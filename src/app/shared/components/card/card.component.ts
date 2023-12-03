import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrencyModel } from '../../models/currency.model';
import { LoadingService } from '../../services/loading/loading.service';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
})
export class CardComponent implements OnInit, AfterViewInit{

  constructor(public loadingService: LoadingService){}

  @Input() currency: CurrencyModel | undefined
  @Input() name: string = ''
  @Output() refresh = new EventEmitter<boolean>()
  @Input() errorApi: boolean = false
  loading: boolean = false
  classColor: string = ''

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((loading) => {
      this.loading = loading;
      this.classColor = this.getColorValue()
    });
    this.classColor = this.getColorValue()
  }

  ngAfterViewInit(): void {
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

  onRefresh(){
    this.refresh.emit(true)
  }

}
