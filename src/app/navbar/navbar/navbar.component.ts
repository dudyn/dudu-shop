import { Component, OnInit } from '@angular/core';
import { HttpPersonService } from 'src/app/http-person.service';
import { HttpProductService } from 'src/app/http-product.service';
import { Osoby } from 'src/app/models/osoby';
import { Produkty } from 'src/app/models/produkty';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  ile = 0;
  czyZalogowany: boolean | undefined;
  zalogowanaOsoba: Osoby = {
    id: 0,
    imie: '',
    nazwisko: '',
    email: '',
    login: '',
    haslo: '',
    stan_konta: 0,
    admin: 0,
  };
  produktyWKoszyku: Produkty[] = [
    {
      id: 0,
      kategoria: '',
      nazwa: '',
      firma: '',
      zdjecie: '',
      ilosc: 0,
      cena: 0,
    },
  ];

  constructor(
    private httpPerson: HttpPersonService,
    private httpProduct: HttpProductService
  ) {}

  ngOnInit(): void {
    this.httpPerson.boolZalogowany1.subscribe(
      (modeValue) => (this.czyZalogowany = modeValue)
    );
    this.httpPerson.osobyZalogowana1.subscribe(
      (a) => (this.zalogowanaOsoba = a)
    );
    this.httpProduct.ileWKoszyku1.subscribe((a) => {
      this.ile = a;
      console.log(a);
    });
    //this.zalogowanaOsoba = this.httpPerson.zalogowanaOsoba;
  }

  name: String = 'Gosc';
}
