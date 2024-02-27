import { Component, OnInit } from '@angular/core';
import { HttpProductService } from 'src/app/http-product.service';
import { Produkty } from 'src/app/models/produkty';

@Component({
  selector: 'app-przedtreningowki',
  templateUrl: './przedtreningowki.component.html',
  styleUrls: ['./przedtreningowki.component.css'],
})
export class PrzedtreningowkiComponent implements OnInit {
  constructor(private httpProduct: HttpProductService) {}

  przedtreningowki: Produkty[] = [];

  ngOnInit(): void {
    this.getPrzedtreningowki();
  }

  getPrzedtreningowki() {
    this.httpProduct
      .getFilteredProdukty('przedtreningowki')
      .subscribe((product) => {
        this.przedtreningowki = product;
      });
  }
}
