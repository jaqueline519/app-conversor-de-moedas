import { Component } from '@angular/core';
import { CardComponent } from '../shared/components/card/card.component';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.sass'
})
export class QuotesComponent {

}
