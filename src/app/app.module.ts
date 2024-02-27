import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { StronaGlownaComponent } from './podstrony/strona-glowna/strona-glowna.component';
import { KreatynyComponent } from './podstrony/kreatyny/kreatyny.component';
import { BialkaComponent } from './podstrony/bialka/bialka.component';
import { WitaminyComponent } from './podstrony/witaminy/witaminy.component';
import { ZdrowakuchniaComponent } from './podstrony/zdrowakuchnia/zdrowakuchnia.component';
import { PrzedtreningowkiComponent } from './podstrony/przedtreningowki/przedtreningowki.component';
import { ProductDetailComponent } from './podstrony/product-detail/product-detail.component';
import { LogowanieComponent } from './podstrony/logowanie/logowanie.component';
import { FormsModule } from '@angular/forms';
import { RejestracjaComponent } from './podstrony/rejestracja/rejestracja.component';
import { PersonDetailComponent } from './podstrony/person-detail/person-detail.component';
import { KoszykComponent } from './podstrony/koszyk/koszyk.component';
import { PomocComponent } from './podstrony/pomoc/pomoc.component';
import { EdycjaProduktuComponent } from './podstrony/edycja-produktu/edycja-produktu.component';
import { PanelAdminaComponent } from './podstrony/panel-admina/panel-admina.component';
import { NgxParallaxScrollModule } from 'ngx-parallax-scroll';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StronaGlownaComponent,
    KreatynyComponent,
    BialkaComponent,
    WitaminyComponent,
    ZdrowakuchniaComponent,
    PrzedtreningowkiComponent,
    ProductDetailComponent,
    LogowanieComponent,
    RejestracjaComponent,
    PersonDetailComponent,
    KoszykComponent,
    PomocComponent,
    EdycjaProduktuComponent,
    PanelAdminaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxParallaxScrollModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
