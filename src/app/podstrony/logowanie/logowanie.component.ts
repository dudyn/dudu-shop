import { Component, OnInit } from '@angular/core';
import { Osoby } from 'src/app/models/osoby';
import { NgModel } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpPersonService } from 'src/app/http-person.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css'],
})
export class LogowanieComponent implements OnInit {
  czyZalogowany: boolean | undefined;
  constructor(
    private location: Location,
    private httpPerson: HttpPersonService,
    private router: Router
  ) {}

  osoby: Osoby[] = [];
  login: string = '';
  haslo: string = '';

  bledneHaslo = false;

  ngOnInit(): void {
    this.getOsoby();
    this.httpPerson.boolZalogowany1.subscribe(
      (modeValue) => (this.czyZalogowany = modeValue)
    );
  }

  send() {
    this.bledneHaslo = false;
    for (let i = 0; i < this.osoby.length; i++) {
      if (
        this.osoby[i].login == this.login &&
        this.osoby[i].haslo == this.haslo &&
        this.osoby[i].login != ''
      ) {
        this.czyZalogowany = true;
        this.httpPerson.zmienZalogowanie(true);
        this.httpPerson.zalogujOsobe(this.osoby[i]);
        this.goToStronaGlowna();
        break;
      } else {
        this.czyZalogowany = false;
      }
      if (i == this.osoby.length - 1 && this.czyZalogowany == false) {
        this.bledneHaslo = true;
        this.httpPerson.zmienZalogowanie(false);
      }
    }
  }

  showValue(fn: string) {
    console.log(fn);
  }

  goBack() {
    this.location.back();
  }

  getOsoby() {
    this.httpPerson.getOsoby().subscribe((osoba) => {
      this.osoby = osoba;
    });
  }

  hidePopup() {
    this.login = '';
    this.haslo = '';
    this.bledneHaslo = false;
  }

  goToStronaGlowna() {
    this.router.navigateByUrl('/stronaglowna');
  }
}
