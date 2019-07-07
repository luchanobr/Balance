import { Component } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';
import { UserStoreService } from './services/user-store.service';
import { fadeInOut } from './animation/fade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInOut]
})
export class AppComponent {

  login: boolean = false
  usuario: any
  constructor(private usuarioService : UsuariosService, private userStoreService: UserStoreService) {

  }
  
  routerOutletTrigger(routerOutlet) {
    return routerOutlet && routerOutlet.activatedRoute;
  }

  ngDoCheck() {
    this.setUsuario()
  }
  setUsuario() {
    this.usuario = this.userStoreService.getUser();
    if (this.usuario == "") this.login = false;
    else this.login = true;
    }

  logout(){
    this.usuarioService.logout().subscribe(
      res => this.userStoreService.deleteUSer(""),
      err => console.log(err)
    )
  }
}
