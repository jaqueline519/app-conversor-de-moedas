import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { CurrencyModel } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class QuotationsService {

  constructor(private http: HttpClient) { }

  getQuotations(currency: string): Observable<any>{

return this.http.get(`https://economia.awesomeapi.com.br/last/${currency}`)
  }

}
