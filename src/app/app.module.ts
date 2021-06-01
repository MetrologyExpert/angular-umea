import { UploadImageComponent } from './medialibrary/upload-image/upload-image.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner'


import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';


import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
//Summernote
//Components
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { InstrumentsListComponent } from './admin/instruments-list/instruments-list.component';
import { InstrumentPageComponent } from './admin/instrument-page/instrument-page.component';
import { InstrumentPageViewComponent } from './admin/instrument-page-view/instrument-page-view.component';
import { InstrumentPageEditComponent } from './admin/instrument-page-edit/instrument-page-edit.component';
import { UncertaintyPageComponent } from './admin/uncertainty-page/uncertainty-page.component';
import { environment } from 'src/environments/environment';
//Services
import { CategoryService } from './category.service';
import { InstrumentService } from './instrument.service';
import { AuthService } from './auth.service';
import { UncertaintyService } from './uncertainty.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormUploadComponent } from './upload/form-upload/form-upload.component';
import { ListUploadComponent } from './upload/list-upload/list-upload.component';
import { DetailsUploadComponent } from './upload/details-upload/details-upload.component';


@NgModule({
  exports: [
   // CDK
   A11yModule,
   OverlayModule,
   CdkStepperModule,
   CdkTableModule,
   MatCardModule,
   MatFormFieldModule,
   MatDividerModule,
   MatIconModule,
   MatToolbarModule,
   MatInputModule,
   MatButtonModule,

   MatInputModule,
   MatTableModule, 
   MatPaginatorModule,
   MatSortModule,
   MatProgressSpinnerModule

]
   })

export class MaterialModule {}



@NgModule({
  declarations: [
    AppComponent,
    InstrumentsListComponent,
    InstrumentPageComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    UncertaintyPageComponent,

    InstrumentPageViewComponent,
    InstrumentPageEditComponent,

    UploadImageComponent, 
    FormUploadComponent, ListUploadComponent, DetailsUploadComponent
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
    HttpClientModule, AngularEditorModule,
    RouterModule.forRoot([
      {path:'', component:HomeComponent},

      {path:'login', component:LoginComponent},

      {path:'admin/instrument-page/new',
       component:InstrumentPageComponent},

      {path:'admin/instrument-page/:id', 
       component:InstrumentPageComponent},

      {path:'admin/instrument-page-view/:id',
       component:InstrumentPageViewComponent},

      {path:'admin/instrument-page-edit/:id',
      component:InstrumentPageEditComponent},

      {path:'admin/uncertainty-page/:id', 
      component:UncertaintyPageComponent},

      {path:'admin/instruments-list', 
      component:InstrumentsListComponent},

      {path:'admin/uncertainty-page',
      component:UncertaintyPageComponent},

      {path:'medialibrary/upload-image',
      component:UploadImageComponent},


    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MaterialModule,

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    CategoryService,
    AuthService,
    InstrumentService,
    UncertaintyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
