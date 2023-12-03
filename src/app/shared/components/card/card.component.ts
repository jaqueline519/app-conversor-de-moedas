import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrencyModel } from '../../models/currency.model';
import { LoadingService } from '../../services/loading/loading.service';
import { ColorsPipe } from '../../pipes/colors.pipe';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NgClass, ColorsPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
})
export class CardComponent implements OnInit{

  constructor(public loadingService: LoadingService){}

  @Input() currency: CurrencyModel | undefined
  @Input() name: string = ''
  @Output() refresh = new EventEmitter<boolean>()
  @Input() errorApi: boolean = false
  loading: boolean = false
  classColor: string = ''
  currentDateTime: Date = new Date();

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((loading) => {
      this.loading = loading;
      this.currentDateTime = new Date();
    });
  }

  onRefresh(){
    this.refresh.emit(true)
  }

  isObjectNotEmpty(obj: CurrencyModel): boolean {
    return obj !== null && obj !== undefined && Object.keys(obj).length > 0;
  }
}
