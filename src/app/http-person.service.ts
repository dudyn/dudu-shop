import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpProductService } from './http-product.service';
import { Osoby } from './models/osoby';
import { Produkty } from './models/produkty';

@Injectable({
  providedIn: 'root',
})
export class HttpPersonService {
  url = 'http://localhost:3000/osoby';
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

  private boolZalogowany = new BehaviorSubject<boolean>(false);
  private osobyZalogowana = new BehaviorSubject<Osoby>(this.zalogowanaOsoba);
  private zalogowaneID = new BehaviorSubject<number>(this.zalogowanaOsoba.id);

  boolZalogowany1 = this.boolZalogowany.asObservable();
  osobyZalogowana1 = this.osobyZalogowana.asObservable();
  zalogowaneID1 = this.zalogowaneID.asObservable();

  constructor(
    private http: HttpClient,
    private httpProduct: HttpProductService
  ) {
    this.boolZalogowany1 = this.boolZalogowany.asObservable();
    this.osobyZalogowana1 = this.osobyZalogowana.asObservable();
    this.zalogowaneID1 = this.zalogowaneID.asObservable();
  }

  getOsoby(): Observable<Osoby[]> {
    return this.http.get<Osoby[]>(this.url);
  }

  zmienZalogowanie(value: boolean) {
    this.boolZalogowany.next(value);
    this.httpProduct.zerujKoszyk();
  }

  zalogujOsobe(o1: Osoby) {
    this.osobyZalogowana.next(o1);
    this.zalogowaneID.next(o1.id);
    this.httpProduct.zerujKoszyk();
  }

  addPerson(person: Partial<Osoby>): Observable<Osoby> {
    return this.http.post<Osoby>(this.url, person);
  }

  getOsoba(id: number): Observable<Osoby> {
    return this.http.get<Osoby>(this.url + '/' + id);
  }

  deletePerson(id: string): Observable<{}> {
    return this.http.delete<{}>(this.url + '/' + id);
  }

  updateOsoba(p: Partial<Osoby>): Observable<Osoby> {
    return this.http
      .patch<Osoby>(this.url + '/' + p.id, p)
      .pipe(tap(console.log));
  }
}
