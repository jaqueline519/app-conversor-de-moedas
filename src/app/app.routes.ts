import { Routes } from '@angular/router';
import { QuotesComponent } from './quotes/quotes.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/currency-converter',
    pathMatch: 'full'
  },
  {
    path: 'currency-converter',
    children: [
      {
        path: '',
        component: QuotesComponent
      }
    ],
  },
  {
    path: '**',
    redirectTo: '/currency-converter',
    pathMatch: 'full'
  }

];
