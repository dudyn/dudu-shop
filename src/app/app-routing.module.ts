import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BialkaComponent } from './podstrony/bialka/bialka.component';
import { EdycjaProduktuComponent } from './podstrony/edycja-produktu/edycja-produktu.component';
import { KoszykComponent } from './podstrony/koszyk/koszyk.component';
import { KreatynyComponent } from './podstrony/kreatyny/kreatyny.component';
import { LogowanieComponent } from './podstrony/logowanie/logowanie.component';
import { PanelAdminaComponent } from './podstrony/panel-admina/panel-admina.component';
import { PersonDetailComponent } from './podstrony/person-detail/person-detail.component';
import { PomocComponent } from './podstrony/pomoc/pomoc.component';
import { ProductDetailComponent } from './podstrony/product-detail/product-detail.component';
import { PrzedtreningowkiComponent } from './podstrony/przedtreningowki/przedtreningowki.component';
import { RejestracjaComponent } from './podstrony/rejestracja/rejestracja.component';
import { StronaGlownaComponent } from './podstrony/strona-glowna/strona-glowna.component';
import { WitaminyComponent } from './podstrony/witaminy/witaminy.component';
import { ZdrowakuchniaComponent } from './podstrony/zdrowakuchnia/zdrowakuchnia.component';

const routes: Routes = [
  { path: 'stronaglowna', component: StronaGlownaComponent },
  { path: 'kreatyny', component: KreatynyComponent },
  { path: 'zdrowakuchnia', component: ZdrowakuchniaComponent },
  { path: 'witaminy', component: WitaminyComponent },
  { path: 'bialka', component: BialkaComponent },
  { path: 'przedtreningowki', component: PrzedtreningowkiComponent },
  { path: 'logowanie', component: LogowanieComponent },
  { path: 'rejestracja', component: RejestracjaComponent },
  { path: 'koszyk', component: KoszykComponent },
  { path: 'pomoc', component: PomocComponent },
  { path: 'paneladmina', component: PanelAdminaComponent },
  { path: 'edycjaproduktu/:id', component: EdycjaProduktuComponent },
  { path: 'konto/:id', component: PersonDetailComponent },
  { path: 'produkt/:id', component: ProductDetailComponent },
  { path: '', redirectTo: '/stronaglowna', pathMatch: 'full' },
  { path: '**', redirectTo: '/stronaglowna', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
