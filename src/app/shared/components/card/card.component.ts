import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
  }

  onRefresh(){
    this.refresh.emit(true)
  }

}
