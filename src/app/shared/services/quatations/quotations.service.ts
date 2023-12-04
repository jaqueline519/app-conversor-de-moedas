import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotationsService {
  private cachedQuotations$: Observable<any> | undefined;
  private lastUpdate: Date | null = null;
  private readonly CACHE_KEY = 'cachedQuotations';
  private readonly LAST_UPDATE_KEY = 'lastUpdate';

  constructor(private http: HttpClient) {
    this.initialize()
  }

  private initialize() {
    const lastUpdateStr = localStorage.getItem(this.LAST_UPDATE_KEY);
    this.lastUpdate = lastUpdateStr ? new Date(lastUpdateStr) : null;
  }


  getQuotations(currency: string): Observable<any> {
    const cachedData = this.getCachedData();
    if (cachedData && this.lastUpdate && this.isLessThanThreeMinutes(this.lastUpdate)) {
      this.cachedQuotations$ = this.cachedQuotations$ || new Observable(observer => {
        observer.next(cachedData);
        observer.complete();
      });
    } else {
      this.cachedQuotations$ = this.http.get(`https://economia.awesomeapi.com.br/last/${currency}`).pipe(
        tap(data => {
          this.lastUpdate = new Date();
          this.setCachedData(data);
          this.setLastUpdate(this.lastUpdate);
        }),
        shareReplay(1),
      );
    }
    return this.cachedQuotations$
  }

  isLessThanThreeMinutes(date: Date): boolean {
    const now = new Date();
    const differenceInMilliseconds = now.getTime() - date.getTime();
    return differenceInMilliseconds < 154800
  }

  private setCachedData(data: any): void {
    localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
  }

  private getCachedData(): any {
    const cachedData = localStorage.getItem(this.CACHE_KEY);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  private setLastUpdate(date: Date): void {
    localStorage.setItem(this.LAST_UPDATE_KEY, date.toString());
  }

  getLastUpdate() {
    return this.lastUpdate
  }
}
