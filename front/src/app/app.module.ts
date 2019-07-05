import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FooterComponent } from './components/footer/footer.component';


import { 
  MatSidenavModule,
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatButtonModule,
  MatDividerModule,
  MatSelectModule,
  MatDatepickerModule,
  MatDialogModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatSnackBarModule,
  MatStepperModule,
  MatExpansionModule,
  MatRadioModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ChartsModule } from 'ng2-charts';
import { MAT_DATE_LOCALE} from '@angular/material/core';
import { UsuariosService } from "./services/usuarios.service"
import {LoginGuard} from "./guards/login.guard"
import { UserStoreService } from './services/user-store.service';
import { BalancesService } from './services/balances.service';
import { BalanceComponent } from './components/balance/balance.component';
import { AlertComponent } from './components/alert/alert.component';
import { AboutComponent } from './components/about/about.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { RecuperarpasswordComponent } from './components/recuperarpassword/recuperarpassword.component';
import { ResetpasswordGuard } from './guards/resetpassword.guard';
import { AuthServiceService } from './services/auth-service.service';


@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent, RegistroComponent, LoginComponent, UsuarioComponent, FooterComponent, BalanceComponent, AlertComponent, AboutComponent, ContactoComponent, ResetpasswordComponent, RecuperarpasswordComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatRadioModule,
    ChartsModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    MatExpansionModule,
    MatStepperModule,
    AppRoutingModule,
  ],
  entryComponents: [BalanceComponent, AlertComponent,RecuperarpasswordComponent],
  providers: [UsuariosService, {  provide: MAT_DATE_LOCALE, useValue: 'es'} ,  LoginGuard, UserStoreService , BalancesService,  {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true} }, {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}, ResetpasswordGuard, {
    provide: HTTP_INTERCEPTORS, useClass: AuthServiceService, multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
