import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpPersonService } from 'src/app/http-person.service';
import { HttpProductService } from 'src/app/http-product.service';
import { Osoby } from 'src/app/models/osoby';
import { Produkty } from 'src/app/models/produkty';

@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css'],
})
export class KoszykComponent implements OnInit {
  showPopup = false;
  kupionyPopup = false;
  [x: string]: any;
  czyZalogowany: boolean | undefined;
  zalogowaneID: number | undefined;
  osoba: Osoby = {
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
  produktyWszystkie: Produkty[] = [];
  cena: number | undefined;

  constructor(
    private httpProduct: HttpProductService,
    private httpPerson: HttpPersonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produktyWKoszyku = this.httpProduct.produktyWKoszyku;
    this.httpProduct.koszyk1.subscribe((a) => {
      console.log(a);
    });
    this.httpPerson.boolZalogowany1.subscribe(
      (modeValue) => (this.czyZalogowany = modeValue)
    );
    this.httpPerson.zalogowaneID1.subscribe(
      (modeValue) => (this.zalogowaneID = modeValue)
    );
    this.getOsoba();
    this.getProdukty();
  }

  getOsoba() {
    if (this.zalogowaneID != undefined && this.zalogowaneID != 0) {
      this.httpPerson.getOsoba(this.zalogowaneID).subscribe((os) => {
        this.osoba = os;
      });
    }
  }

  wyczyscKoszyk() {
    this.cena = 0;
    this.produktyWKoszyku = [
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
    this.httpProduct.zerujKoszyk();
  }

  liczCene() {
    let cenaDoZaplaty = 0;
    for (let i = 0; i < this.produktyWKoszyku.length; i++) {
      cenaDoZaplaty =
        cenaDoZaplaty +
        Number(this.produktyWKoszyku[i].cena) *
          Number(this.produktyWKoszyku[i].ilosc);
    }
    this.cena = cenaDoZaplaty;
  }

  kup() {
    let cenaDoZaplaty = 0;
    let warunki;

    for (let i = 0; i < this.produktyWKoszyku.length; i++) {
      cenaDoZaplaty =
        cenaDoZaplaty +
        Number(this.produktyWKoszyku[i].cena) *
          Number(this.produktyWKoszyku[i].ilosc);
    }

    for (let i = 0; i < this.produktyWKoszyku.length; i++) {
      for (let j = 0; j < this.produktyWszystkie.length; j++) {
        if (this.produktyWKoszyku[i].id == this.produktyWszystkie[j].id) {
          if (
            this.produktyWKoszyku[i].ilosc > this.produktyWszystkie[j].ilosc
          ) {
            warunki = false;
          } else {
            warunki = true;
          }
        }
      }
    }

    if (this.osoba.stan_konta > cenaDoZaplaty && warunki == true) {
      console.log('kupione');
      console.log('warunki: ' + warunki);
      console.log('cenadozaplaty: ' + cenaDoZaplaty);
      for (let i = 1; i < this.produktyWKoszyku.length; i++) {
        let t: Produkty = {
          id: 0,
          kategoria: '',
          nazwa: '',
          firma: '',
          zdjecie: '',
          ilosc: 0,
          cena: 0,
        };
        this.httpProduct
          .getProdukt(this.produktyWKoszyku[i].id)
          .subscribe((x) => {
            t = x;
            console.log(t);
            t.ilosc = t.ilosc - this.produktyWKoszyku[i].ilosc;
            this.httpProduct.updateIloscProduktu(t).subscribe();
          });
      }
      let os: Partial<Osoby> = {
        id: this.zalogowaneID,
        stan_konta: this.osoba.stan_konta - cenaDoZaplaty,
      };
      this.httpPerson.updateOsoba(os).subscribe();
      this.openKupionyPopup();
    } else {
      this.showPopup = true;
      console.log(this.produktyWszystkie);
      console.log(this.produktyWKoszyku);
      console.log('nie kupione');
      console.log('warunki: ' + warunki);
      console.log('cenadozaplaty: ' + cenaDoZaplaty);
    }
  }

  getProdukty() {
    this.httpProduct.getProdukty().subscribe((product) => {
      this.produktyWszystkie = product;
      this.liczCene();
    });
  }

  goToStronaGlowna() {
    this.router.navigateByUrl('/stronaglowna');
  }

  hidePopup() {
    this.showPopup = false;
  }

  usunPozycje(x: number) {
    this.produktyWKoszyku.splice(x, 1);
    this.liczCene();
    this.httpProduct.pokazKoszyk();
  }

  openKupionyPopup() {
    this.kupionyPopup = true;
  }

  closeKupionyPopup() {
    this.httpProduct.zerujKoszyk();
    this.kupionyPopup = false;
    this.goToStronaGlowna();
  }
}
