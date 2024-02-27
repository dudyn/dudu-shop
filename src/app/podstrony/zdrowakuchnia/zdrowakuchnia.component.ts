import { Component, OnInit } from '@angular/core';
import { HttpProductService } from 'src/app/http-product.service';
import { Produkty } from 'src/app/models/produkty';

@Component({
  selector: 'app-zdrowakuchnia',
  templateUrl: './zdrowakuchnia.component.html',
  styleUrls: ['./zdrowakuchnia.component.css'],
})
export class ZdrowakuchniaComponent implements OnInit {
  constructor(private httpProduct: HttpProductService) {}

  zdrowakuchnia: Produkty[] = [];

  ngOnInit(): void {
    this.getZdrowakuchnia();
  }

  getZdrowakuchnia() {
    this.httpProduct
      .getFilteredProdukty('zdrowakuchnia')
      .subscribe((product) => {
        this.zdrowakuchnia = product;
      });
  }
}
