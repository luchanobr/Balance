import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {UsuariosService} from "../../services/usuarios.service";
import {UserStoreService} from "../../services/user-store.service"
import { Usuario } from 'src/app/models/usuario';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})



export class NavbarComponent implements OnInit {
  
  @Output() sidenav = new EventEmitter<boolean>();

  login: boolean = false
  usuario : any 
  
  constructor(private usuarioService: UsuariosService, private userStoreService : UserStoreService) { }

  ngOnInit() {
    this.setUsuario()
  }
  sidenavToggle() {
    this.sidenav.emit();
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