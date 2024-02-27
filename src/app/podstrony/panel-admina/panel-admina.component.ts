import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpPersonService } from 'src/app/http-person.service';
import { Osoby } from 'src/app/models/osoby';

@Component({
  selector: 'app-panel-admina',
  templateUrl: './panel-admina.component.html',
  styleUrls: ['./panel-admina.component.css'],
})
export class PanelAdminaComponent implements OnInit {
  zalogowaneID: number | undefined;
  osoby: Osoby[] = [];
  tytuly = [
    'id',
    'imie',
    'nazwisko',
    'login',
    'adres e-mail',
    'stan konta',
    'usuń',
  ];

  constructor(
    private httpPerson: HttpPersonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOsoby();
    this.httpPerson.zalogowaneID1.subscribe(
      (modeValue) => (this.zalogowaneID = modeValue)
    );
  }

  goToStronaGlowna() {
    this.router.navigateByUrl('/stronaglowna');
  }

  getOsoby() {
    this.httpPerson.getOsoby().subscribe((osoba) => {
      this.osoby = osoba;
    });
  }

  usun(numer: number) {
    this.httpPerson.deletePerson(numer.toString()).subscribe((deletedMan) => {
      this.getOsoby();
    });
  }
}
