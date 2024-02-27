import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpPersonService } from 'src/app/http-person.service';
import { HttpProductService } from 'src/app/http-product.service';
import { Produkty } from 'src/app/models/produkty';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edycja-produktu',
  templateUrl: './edycja-produktu.component.html',
  styleUrls: ['./edycja-produktu.component.css'],
})
export class EdycjaProduktuComponent implements OnInit {
  produkt: Partial<Produkty> = {};
  zalogowaneID: number | undefined;

  constructor(
    private httpProduct: HttpProductService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private httpPerson: HttpPersonService
  ) {}

  ngOnInit(): void {
    this.getProdukt();
    this.httpPerson.zalogowaneID1.subscribe(
      (modeValue) => (this.zalogowaneID = modeValue)
    );
  }

  getProdukt() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.httpProduct.getProdukt(id).subscribe((p) => {
      this.produkt = p;
    });
  }

  send() {
    if (this.produkt.id) {
      let t: Produkty = {
        id: 0,
        kategoria: '',
        nazwa: '',
        firma: '',
        zdjecie: '',
        ilosc: 0,
        cena: 0,
      };
      this.httpProduct.getProdukt(this.produkt.id).subscribe((x) => {
        t = x;
        if (
          this.produkt.ilosc &&
          this.produkt.kategoria &&
          this.produkt.nazwa &&
          this.produkt.cena
        ) {
          t.kategoria = this.produkt.kategoria;
          t.nazwa = this.produkt.nazwa;
          t.ilosc = this.produkt.ilosc;
          t.cena = this.produkt.cena;
        }
        this.httpProduct.updateIloscProduktu(t).subscribe();
        this.goToStronaGlowna();
      });
    }
  }

  goBack() {
    this.location.back();
  }

  goToStronaGlowna() {
    this.router.navigateByUrl('/stronaglowna');
  }
}
