import { Component, OnInit } from '@angular/core';
import { Kreatyny } from 'src/app/models/kreatyny';
import { HttpProductService } from 'src/app/http-product.service';
import { Observable } from 'rxjs';
import { Bialka } from 'src/app/models/bialka';
import { Przedtreningowki } from 'src/app/models/przedtreningowki';
import { Zdrowakuchnia } from 'src/app/models/zdrowakuchnia';
import { Witaminy } from 'src/app/models/witaminy';
import { Produkty } from 'src/app/models/produkty';
import { Osoby } from 'src/app/models/osoby';
import { HttpPersonService } from 'src/app/http-person.service';
import { ParallaxConf } from 'src/app/parallax-config';
import { IParallaxScrollConfig } from 'ngx-parallax-scroll';
import { animations } from 'src/app/animations';

interface Position {
  left: string;
  top: string;
}

interface Star {
  img: string;
  position: Position;
  conf: IParallaxScrollConfig;
  speed: number;
}

@Component({
  selector: 'app-strona-glowna',
  templateUrl: './strona-glowna.component.html',
  styleUrls: ['./strona-glowna.component.css'],
  animations: animations,
})
export class StronaGlownaComponent implements OnInit {
  constructor(
    private httpProduct: HttpProductService,
    private httpPerson: HttpPersonService
  ) {}
  zalogowaneID: number | undefined;
  filterValue = '';

  sortowanieAsc = false;
  sortowanieDesc = false;
  filtrowanie = false;

  kreatyny: Kreatyny[] = [];
  bialka: Bialka[] = [];
  przedtreningowki: Przedtreningowki[] = [];
  zdrowakuchnia: Zdrowakuchnia[] = [];
  witaminy: Witaminy[] = [];

  produkty: Produkty[] = [];

  private minStarsCount: number = 10;
  private maxStarsCount: number = 20;
  stars: Array<Star> = [];

  ngOnInit(): void {
    this.generateStars();
    //this.getKreatyny();
    // this.getBialka();
    //this.getPrzedtreningowki();
    //this.getZdrowakuchnia();
    //this.getWitaminy();

    this.getProdukty();

    this.httpPerson.zalogowaneID1.subscribe((modeValue) => {
      this.zalogowaneID = modeValue;
    });
  }

  generateStars() {
    for (let index = 0; index < this.generatedRandomStarsCount(); index++) {
      this.stars.push({
        img: `"../../../assets/images/cartoon${Math.round(
          Math.random() * 4
        )}.png`,
        position: this.generatePosition(),
        conf: new ParallaxConf(),
        speed: Math.random() * 0.5,
      });
    }
  }

  test() {
    console.log('sss');
  }

  generatePosition(): Position {
    return {
      left: `${this.mathRandom(95)}%`,
      top: `${this.mathRandom(480) + 220}px`,
    };
  }

  mathRandom(endpoint: number): number {
    return Math.round(Math.random() * endpoint);
  }

  generatedRandomStarsCount(): number {
    return Math.floor(
      Math.random() * (this.maxStarsCount - this.minStarsCount + 1) +
        this.minStarsCount
    );
  }

  onGalaxyGenerate() {
    this.stars = [];
    this.generateStars();
  }

  getKreatyny() {
    this.httpProduct.getKreatyny().subscribe((product) => {
      this.kreatyny = product;
    });
  }

  getBialka() {
    this.httpProduct.getBialka().subscribe((product) => {
      this.bialka = product;
    });
  }

  getPrzedtreningowki() {
    this.httpProduct.getPrzedtreningowki().subscribe((product) => {
      this.przedtreningowki = product;
    });
  }

  getZdrowakuchnia() {
    this.httpProduct.getZdrowakuchnia().subscribe((product) => {
      this.zdrowakuchnia = product;
    });
  }

  getWitaminy() {
    this.httpProduct.getWitaminy().subscribe((product) => {
      this.witaminy = product;
    });
  }

  getProdukty() {
    this.httpProduct.getProdukty().subscribe((product) => {
      this.produkty = product;
    });
  }

  getFilteredProducts(filterValue: string) {
    this.httpProduct.getFilteredProducts(filterValue).subscribe((x) => {
      this.produkty = x;
    });
  }

  getSortedProductsDesc() {
    this.httpProduct.getSortedProductsDesc().subscribe((x) => {
      this.produkty = x;
    });
  }

  getSortedProductsAsc() {
    this.httpProduct.getSortedProductsAsc().subscribe((x) => {
      this.produkty = x;
    });
  }

  getSortedAndFilteredProductsAsc() {
    this.httpProduct
      .getSortedAndFilteredProductsAsc(this.filterValue)
      .subscribe((x) => {
        this.produkty = x;
      });
  }

  getSortedAndFilteredProductsDesc() {
    this.httpProduct
      .getSortedAndFilteredProductsDesc(this.filterValue)
      .subscribe((x) => {
        this.produkty = x;
      });
  }

  odpalSortowanieDesc() {
    if (this.sortowanieDesc == false) {
      this.sortowanieAsc = false;
      this.sortowanieDesc = true;
    } else {
      this.sortowanieAsc = false;
      this.sortowanieDesc = false;
    }
    this.SortujFiltruj();
  }

  odpalSortowanieAsc() {
    if (this.sortowanieAsc == false) {
      this.sortowanieAsc = true;
      this.sortowanieDesc = false;
    } else {
      this.sortowanieAsc = false;
      this.sortowanieDesc = false;
    }
    this.SortujFiltruj();
  }

  odpalFiltrowanie() {
    if (this.filterValue != '') {
      this.filtrowanie = true;
    } else {
      this.filtrowanie = false;
    }
    this.SortujFiltruj();
  }

  SortujFiltruj() {
    if (this.sortowanieDesc == true && this.filtrowanie == true) {
      this.getSortedAndFilteredProductsDesc();
      console.log('1');
    } else if (this.sortowanieAsc == true && this.filtrowanie == true) {
      this.getSortedAndFilteredProductsAsc();
      console.log('2');
    } else if (this.sortowanieDesc == true && this.filtrowanie == false) {
      this.getSortedProductsDesc();
      console.log('3');
    } else if (this.sortowanieAsc == true && this.filtrowanie == false) {
      this.getSortedProductsAsc();
      console.log('4');
    } else if (this.filtrowanie == true) {
      this.getFilteredProducts(this.filterValue);
      console.log('5');
    } else {
      this.getProdukty();
      console.log('6');
    }
  }
}
