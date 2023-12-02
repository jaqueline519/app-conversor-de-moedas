import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotationsService {
  constructor(private http: HttpClient) { }

  getQuotations(currency: string): Observable<any>{
  return this.http.get(`https://economia.awesomeapi.com.br/last/${currency}`)
  }
}
