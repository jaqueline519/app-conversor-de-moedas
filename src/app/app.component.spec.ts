import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CardComponent } from './shared/components/card/card.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterOutlet, HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'app-conversor-de-moedas' title`, () => {
    expect(app.title).toEqual('app-conversor-de-moedas');
  });

});
