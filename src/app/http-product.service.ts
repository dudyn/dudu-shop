import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Kreatyny } from 'src/app/models/kreatyny';
import { Bialka } from './models/bialka';
import { Produkty } from './models/produkty';
import { Przedtreningowki } from './models/przedtreningowki';
import { Witaminy } from './models/witaminy';
import { Zdrowakuchnia } from './models/zdrowakuchnia';

@Injectable({
  providedIn: 'root',
})
export class HttpProductService {
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

  url = 'http://localhost:3000/';

  private koszyk = new BehaviorSubject<Produkty[]>(this.produktyWKoszyku);
  koszyk1 = this.koszyk.asObservable();

  private ileWKoszyku = new BehaviorSubject<number>(0);
  ileWKoszyku1 = this.ileWKoszyku.asObservable();

  constructor(private http: HttpClient) {
    this.koszyk1 = this.koszyk.asObservable();
    this.ileWKoszyku1 = this.ileWKoszyku.asObservable();
  }

  getKreatyny(): Observable<Kreatyny[]> {
    return this.http.get<Kreatyny[]>(this.url + 'kreatyny');
  }

  getBialka(): Observable<Bialka[]> {
    return this.http.get<Bialka[]>(this.url + 'bialka');
  }

  getPrzedtreningowki(): Observable<Przedtreningowki[]> {
    return this.http.get<Przedtreningowki[]>(this.url + 'przedtreningowki');
  }

  getZdrowakuchnia(): Observable<Zdrowakuchnia[]> {
    return this.http.get<Zdrowakuchnia[]>(this.url + 'zdrowakuchnia');
  }

  getWitaminy(): Observable<Witaminy[]> {
    return this.http.get<Witaminy[]>(this.url + 'witaminy');
  }

  getProdukty(): Observable<Produkty[]> {
    return this.http.get<Produkty[]>(this.url + 'produkty');
  }

  getFilteredProdukty(filter: string): Observable<Produkty[]> {
    return this.http.get<Produkty[]>(
      this.url + 'produkty' + '?' + 'kategoria' + '_like=' + filter
    );
  }

  getProdukt(id: number): Observable<Produkty> {
    return this.http.get<Produkty>(this.url + 'produkty/' + id);
  }

  pokazKoszyk() {
    console.log(this.produktyWKoszyku);
    this.ileWKoszyku.next(this.produktyWKoszyku.length - 1);
  }

  zerujKoszyk() {
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
    this.ileWKoszyku.next(0);
  }

  dodajDoKoszyka(ident: number, ilosc: number) {
    let pobrany: Produkty = {
      id: 0,
      kategoria: '',
      nazwa: '',
      firma: '',
      zdjecie: '',
      ilosc: 0,
      cena: 0,
    };
    this.getProdukt(ident).subscribe((p) => {
      pobrany = p;
      if (pobrany.id) {
        const obiekt: Produkty = {
          id: ident,
          kategoria: pobrany.kategoria,
          nazwa: pobrany.nazwa,
          firma: pobrany.firma,
          zdjecie: pobrany.zdjecie,
          ilosc: ilosc,
          cena: pobrany.cena,
        };

        this.produktyWKoszyku.push(obiekt);
        this.ileWKoszyku.next(this.produktyWKoszyku.length - 1);
      }
    });
  }

  updateIloscProduktu(p: Partial<Produkty>): Observable<Produkty> {
    return this.http
      .patch<Produkty>(this.url + 'produkty/' + p.id, p)
      .pipe(tap(console.log));
  }

  getFilteredProducts(filter: string): Observable<Produkty[]> {
    return this.http
      .get<Produkty[]>(this.url + 'produkty/?nazwa_like=' + filter)
      .pipe(tap(console.log));
  }

  getSortedProductsAsc(): Observable<Produkty[]> {
    return this.http
      .get<Produkty[]>(this.url + 'produkty/?_sort=cena&_order=asc')
      .pipe(tap(console.log));
  }

  getSortedProductsDesc(): Observable<Produkty[]> {
    return this.http
      .get<Produkty[]>(this.url + 'produkty/?_sort=cena&_order=desc')
      .pipe(tap(console.log));
  }

  getSortedAndFilteredProductsAsc(filterValue: string): Observable<Produkty[]> {
    return this.http
      .get<Produkty[]>(
        this.url +
          'produkty?_sort=' +
          'cena' +
          '&_order=' +
          'asc' +
          '&' +
          'nazwa' +
          '_like=' +
          filterValue
      )
      .pipe(tap(console.log));
  }

  getSortedAndFilteredProductsDesc(
    filterValue: string
  ): Observable<Produkty[]> {
    return this.http
      .get<Produkty[]>(
        this.url +
          'produkty?_sort=' +
          'cena' +
          '&_order=' +
          'desc' +
          '&' +
          'nazwa' +
          '_like=' +
          filterValue
      )
      .pipe(tap(console.log));
  }
}
