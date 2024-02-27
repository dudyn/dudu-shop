import { Component, OnInit } from '@angular/core';
import { HttpProductService } from 'src/app/http-product.service';
import { Produkty } from 'src/app/models/produkty';

@Component({
  selector: 'app-bialka',
  templateUrl: './bialka.component.html',
  styleUrls: ['./bialka.component.css'],
})
export class BialkaComponent implements OnInit {
  constructor(private httpProduct: HttpProductService) {}

  bialka: Produkty[] = [];

  ngOnInit(): void {
    this.getBialka();
  }

  getBialka() {
    this.httpProduct.getFilteredProdukty('bialka').subscribe((product) => {
      this.bialka = product;
    });
  }
}
