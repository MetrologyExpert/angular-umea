

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Angular Firebase
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from '@angular/fire';
//
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Bootstrap Ng module
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//Components
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { InstrumentsListComponent } from './admin/instruments-list/instruments-list.component';
import { InstrumentPageComponent } from './admin/instrument-page/instrument-page.component';
import { UncertaintyPageComponent } from './admin/uncertainty-page/uncertainty-page.component';
import { environment } from 'src/environments/environment';
//Services
import { CategoryService } from './category.service';
import { InstrumentService } from './instrument.service';
import { AuthService } from './auth.service';
import { UncertaintyService } from './uncertainty.service';
import { InstrumentPageViewComponent } from './admin/instrument-page-view/instrument-page-view.component';


@NgModule({
  declarations: [
    AppComponent,
    InstrumentsListComponent,
    InstrumentPageComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    UncertaintyPageComponent,
    InstrumentPageViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot([
      {path:'', component:HomeComponent},

      {path:'login', component:LoginComponent},

      {path:'admin/instrument-page/new',
       component:InstrumentPageComponent},

       {path:'admin/instrument-page/:id', 
       component:InstrumentPageComponent},

       {path:'admin/instrument-page-view/:id',
       component:InstrumentPageViewComponent},

      {path:'admin/uncertainty-page/:id', 
      component:UncertaintyPageComponent},

      {path:'admin/instruments-list', 
      component:InstrumentsListComponent},

      {path:'admin/uncertainty-page',
      component:UncertaintyPageComponent}

    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [
    CategoryService,
    AuthService,
    InstrumentService,
    UncertaintyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
