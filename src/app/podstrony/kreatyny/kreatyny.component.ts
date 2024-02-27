import { Component, OnInit } from '@angular/core';
import { HttpProductService } from 'src/app/http-product.service';
import { Produkty } from 'src/app/models/produkty';

@Component({
  selector: 'app-kreatyny',
  templateUrl: './kreatyny.component.html',
  styleUrls: ['./kreatyny.component.css'],
})
export class KreatynyComponent implements OnInit {
  constructor(private httpProduct: HttpProductService) {}

  kreatyny: Produkty[] = [];

  ngOnInit(): void {
    this.getKreatyny();
  }

  getKreatyny() {
    this.httpProduct.getFilteredProdukty('kreatyny').subscribe((product) => {
      this.kreatyny = product;
    });
  }
}
