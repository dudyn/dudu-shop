import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpProductService } from 'src/app/http-product.service';
import { Produkty } from 'src/app/models/produkty';
import { Location } from '@angular/common';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { Osoby } from 'src/app/models/osoby';
import { HttpPersonService } from 'src/app/http-person.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
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
  showPopup = false;
  showPopupBrakProduktu = false;

  constructor(
    private httpProduct: HttpProductService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private httpPerson: HttpPersonService
  ) {}

  dostepnoscduza: Boolean = false;
  dostepnoscsrednia: Boolean = false;
  dostepnoscmala: Boolean = false;
  dostepnoscbrak: Boolean = false;

  tokreatyna: Boolean = false;
  towitamina: Boolean = false;
  tozdrowazywnosc: Boolean = false;
  tobialko: Boolean = false;
  toprzedtreningowka: Boolean = false;

  wyborIlosciProduktu = 1;

  produkt: Partial<Produkty> = {};

  ngOnInit(): void {
    this.getProdukt();
    this.httpPerson.boolZalogowany1.subscribe(
      (modeValue) => (this.czyZalogowany = modeValue)
    );
    this.httpPerson.osobyZalogowana1.subscribe(
      (a) => (this.zalogowanaOsoba = a)
    );
  }

  dodajDoKoszyka() {
    if (
      this.zalogowanaOsoba.id == 0 ||
      this.zalogowanaOsoba.id == null ||
      this.zalogowanaOsoba.id == undefined ||
      this.czyZalogowany == false
    ) {
      this.showPopup = true;
    } else {
      this.showPopup = false;
      if (this.dostepnoscbrak == true) {
        this.showPopupBrakProduktu = true;
      } else {
        this.showPopupBrakProduktu = false;
        if (this.produkt.id) {
          this.httpProduct.dodajDoKoszyka(
            this.produkt.id,
            this.wyborIlosciProduktu
          );
          this.router.navigateByUrl('/koszyk');
        }
      }
    }
  }

  hidePopup() {
    this.showPopup = false;
    this.showPopupBrakProduktu = false;
  }

  goBack() {
    this.location.back();
  }

  zwiekszWartosc() {
    this.wyborIlosciProduktu += 1;
    if (
      (this.produkt.ilosc && this.wyborIlosciProduktu >= this.produkt.ilosc) ||
      (this.produkt.ilosc && this.wyborIlosciProduktu >= 999)
    ) {
      this.wyborIlosciProduktu = this.produkt.ilosc;
    }
  }

  zmniejszWartosc() {
    this.wyborIlosciProduktu -= 1;
    if (this.wyborIlosciProduktu <= 1) {
      this.wyborIlosciProduktu = 1;
    }
  }

  getProdukt() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.httpProduct.getProdukt(id).subscribe((p) => {
      this.produkt = p;
      this.czyDostepny();
      this.jakaKategoria();
    });
  }

  czyDostepny() {
    if (this.produkt.ilosc) {
      if (this.produkt.ilosc <= 0) {
        this.dostepnoscduza = false;
        this.dostepnoscsrednia = false;
        this.dostepnoscmala = false;
        this.dostepnoscbrak = true;
      } else if (this.produkt.ilosc > 0 && this.produkt.ilosc <= 25) {
        this.dostepnoscduza = false;
        this.dostepnoscsrednia = false;
        this.dostepnoscmala = true;
        this.dostepnoscbrak = false;
      } else if (this.produkt.ilosc > 25 && this.produkt.ilosc <= 100) {
        this.dostepnoscduza = false;
        this.dostepnoscsrednia = true;
        this.dostepnoscmala = false;
        this.dostepnoscbrak = false;
      } else {
        this.dostepnoscduza = true;
        this.dostepnoscsrednia = false;
        this.dostepnoscmala = false;
        this.dostepnoscbrak = false;
      }
    }
    if (this.produkt.ilosc == 0) {
      this.dostepnoscduza = false;
      this.dostepnoscsrednia = false;
      this.dostepnoscmala = false;
      this.dostepnoscbrak = true;
    }
  }

  jakaKategoria() {
    if (this.produkt.kategoria) {
      if (this.produkt.kategoria == 'bialka') {
        this.tobialko = true;
        this.tokreatyna = false;
        this.towitamina = false;
        this.toprzedtreningowka = false;
        this.tozdrowazywnosc = false;
      } else if (this.produkt.kategoria == 'kreatyny') {
        this.tobialko = false;
        this.tokreatyna = true;
        this.towitamina = false;
        this.toprzedtreningowka = false;
        this.tozdrowazywnosc = false;
      } else if (this.produkt.kategoria == 'witaminy') {
        this.tobialko = false;
        this.tokreatyna = false;
        this.towitamina = true;
        this.toprzedtreningowka = false;
        this.tozdrowazywnosc = false;
      } else if (this.produkt.kategoria == 'przedtreningowki') {
        this.tobialko = false;
        this.tokreatyna = false;
        this.towitamina = false;
        this.toprzedtreningowka = true;
        this.tozdrowazywnosc = false;
      } else {
        this.tobialko = false;
        this.tokreatyna = false;
        this.towitamina = false;
        this.toprzedtreningowka = false;
        this.tozdrowazywnosc = true;
      }
    }
  }
}
