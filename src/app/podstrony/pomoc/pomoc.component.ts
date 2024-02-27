import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-pomoc',
  templateUrl: './pomoc.component.html',
  styleUrls: ['./pomoc.component.css'],
})
export class PomocComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  goToStronaGlowna() {
    this.router.navigateByUrl('/stronaglowna');
  }
}
