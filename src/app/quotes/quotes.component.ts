import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { CardComponent } from '../shared/components/card/card.component';
import { QuotationsService } from '../shared/services/quotations.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CurrencyModel } from '../shared/models/currency.model';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CardComponent, HttpClientModule],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.sass'
})
export class QuotesComponent implements OnInit {

  dolarCanadense: CurrencyModel | any;
  pesoArgentino: CurrencyModel | any;
  libraEsterlina: CurrencyModel | any;
  constructor(private quatationsService: QuotationsService){}

  ngOnInit(): void {
    this.getQuatation()
  }

  getQuatation(){
    this.quatationsService.getQuotations('CAD-BRL,ARS-BRL,GBP-BRL')
    .subscribe(response => {
      this.dolarCanadense ={...response['CADBRL'], name: this.formatText(response['CADBRL'])}
      this.pesoArgentino = {...response['ARSBRL'], name: this.formatText(response['ARSBRL'])}
      this.libraEsterlina = {...response['GBPBRL'], name: this.formatText(response['GBPBRL'])}
    })
  }

  formatText(currency: CurrencyModel){
    const name = currency.name;
    const splitName = name?.split('/');
    return splitName ? splitName[0]: '';
  }
}
