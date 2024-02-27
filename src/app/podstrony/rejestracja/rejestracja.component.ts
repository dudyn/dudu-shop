import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpPersonService } from 'src/app/http-person.service';
import { Osoby } from 'src/app/models/osoby';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rejestracja',
  templateUrl: './rejestracja.component.html',
  styleUrls: ['./rejestracja.component.css'],
})
export class RejestracjaComponent implements OnInit {
  osoby: Osoby[] = [];
  osoba: Partial<Osoby> = {
    imie: '',
    nazwisko: '',
    email: '',
    login: '',
    haslo: '',
    stan_konta: 0,
    admin: 0,
  };

  imie: string = '';
  nazwisko: string = '';
  login: string = '';
  haslo: string = '';
  haslo1: string = '';
  email: string = '';
  stan_konta: number = 0;

  poprawnyLogin = true;
  poprawneHaslo = true;

  showPopup = false;

  constructor(
    private location: Location,
    private httpPerson: HttpPersonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.poprawnyLogin = true;
    this.poprawneHaslo = true;
    this.imie = '';
    this.nazwisko = '';
    this.login = '';
    this.haslo = '';
    this.haslo1 = '';
    this.email = '';
    this.stan_konta = 0;
    this.getOsoby();
  }

  send() {
    console.log(this.imie);
    console.log(this.nazwisko);
    console.log(this.login);
    console.log(this.haslo);
    console.log(this.haslo1);
    console.log(this.email);
    console.log(this.stan_konta);

    console.log(this.poprawnyLogin);
    console.log(this.poprawneHaslo);

    this.addPerson();

    this.openPopup();
  }

  goBack() {
    this.location.back();
  }

  getOsoby() {
    this.httpPerson.getOsoby().subscribe((osoba) => {
      this.osoby = osoba;
    });
  }

  sprLogin() {
    this.poprawnyLogin = true;
    for (let i = 0; i < this.osoby.length; i++) {
      if (this.osoby[i].login == this.login && this.login != '') {
        this.poprawnyLogin = false;
      }
    }
    console.log(this.poprawnyLogin);
  }

  sprHaslo() {
    this.poprawneHaslo = true;
    if (this.haslo1 == this.haslo && this.haslo != '') {
      this.poprawneHaslo = true;
    } else {
      this.poprawneHaslo = false;
    }
    console.log(this.poprawneHaslo);
  }

  addPerson() {
    this.osoba.imie = this.imie;
    this.osoba.nazwisko = this.nazwisko;
    this.osoba.email = this.email;
    this.osoba.login = this.login;
    this.osoba.haslo = this.haslo;
    this.osoba.stan_konta = this.stan_konta;
    this.osoba.admin = 0;
    this.httpPerson.addPerson(this.osoba).subscribe();
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.router.navigateByUrl('/logowanie');
  }
}
