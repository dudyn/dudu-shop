import { Component, OnInit } from '@angular/core';
import { HttpProductService } from 'src/app/http-product.service';
import { Produkty } from 'src/app/models/produkty';

@Component({
  selector: 'app-witaminy',
  templateUrl: './witaminy.component.html',
  styleUrls: ['./witaminy.component.css'],
})
export class WitaminyComponent implements OnInit {
  constructor(private httpProduct: HttpProductService) {}

  witaminy: Produkty[] = [];

  ngOnInit(): void {
    this.getWitaminy();
  }

  getWitaminy() {
    this.httpProduct.getFilteredProdukty('witaminy').subscribe((product) => {
      this.witaminy = product;
    });
  }
}
