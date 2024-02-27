import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpPersonService } from 'src/app/http-person.service';
import { Osoby } from 'src/app/models/osoby';
import { Location } from '@angular/common';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css'],
})
export class PersonDetailComponent implements OnInit {
  showPopup = false;
  showPopupError = false;
  czyZalogowany: boolean | undefined;
  zalogowaneID: number | undefined;
  osoba: Osoby = {
    id: 0,
    imie: '',
    nazwisko: '',
    email: '',
    login: '',
    haslo: '',
    stan_konta: 0,
    admin: 0,
  };

  test: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private httpPerson: HttpPersonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOsoba();
    this.httpPerson.boolZalogowany1.subscribe(
      (modeValue) => (this.czyZalogowany = modeValue)
    );
    this.httpPerson.zalogowaneID1.subscribe(
      (modeValue) => (this.zalogowaneID = modeValue)
    );
    this.checkPopupError();
  }

  setTest(a: number) {
    this.test = a;
  }

  getOsoba() {
    this.setTest(Number(this.route.snapshot.paramMap.get('id')));
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.httpPerson.getOsoba(id).subscribe((os) => {
      this.osoba = os;
    });
  }

  wyloguj() {
    this.httpPerson.zmienZalogowanie(false);
    this.czyZalogowany = false;
    this.router.navigateByUrl('/stronaglowna');
  }

  usun() {
    this.httpPerson
      .deletePerson(this.osoba.id.toString())
      .subscribe((deletedMan) => {});

    this.httpPerson.zmienZalogowanie(false);
    this.czyZalogowany = false;
    this.router.navigateByUrl('/stronaglowna');
  }

  openPopup() {
    this.showPopup = true;
    this.checkPopupError();
  }

  closePopupBezUsuwania() {
    this.showPopup = false;
  }

  closePopupZUsuwaniem() {
    this.showPopup = false;
    this.usun();
  }

  checkPopupError() {
    if (
      this.zalogowaneID != this.test ||
      this.test == 0 ||
      this.zalogowaneID == 0
    ) {
      this.showPopupError = true;
    } else {
      this.showPopupError = false;
    }
  }

  closePopup2() {
    this.router.navigateByUrl('/stronaglowna');
  }
}
