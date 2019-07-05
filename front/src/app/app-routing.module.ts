import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginGuard } from './guards/login.guard';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ResetpasswordGuard } from './guards/resetpassword.guard';

const routes: Routes = [
  {
    path:"home",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "registro",
    component: RegistroComponent
  },
  {
    path: "usuarios/:usuario",
    component: UsuarioComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "contacto",
    component: ContactoComponent
  },
  {
    path: "reset/:usuario_id/:token",
    component: ResetpasswordComponent,
    canActivate: [ResetpasswordGuard]
  },
  { 
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: "**",
    redirectTo: "/home",
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
