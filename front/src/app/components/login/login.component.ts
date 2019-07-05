import { Component, OnInit } from '@angular/core';
import {UsuariosService} from "../../services/usuarios.service";
import {LoginUser} from "../../models/login-user";
import { FormBuilder, Validators } from '@angular/forms';
import {UserStoreService} from "../../services/user-store.service"
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import {MatSnackBar, MatDialog} from "@angular/material";
import {RecuperarpasswordComponent}  from "../recuperarpassword/recuperarpassword.component";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  message: {} = {message: ""}
  usuario: any 
  constructor(private userService: UsuariosService, private fb: FormBuilder, private userStoreService: UserStoreService, private router : Router, private snackbar : MatSnackBar, private dialog : MatDialog) { }

  ngOnInit() {
  }
  loginForm = this.fb.group({
    mail:["", [Validators.required, Validators.email]],
    password: ["", Validators.required]
  }); 

   login(loginForm: LoginUser) {
     this.userService.login(loginForm).subscribe(
       (res: object) => {
         if (res.hasOwnProperty("error")) {
          this.snackbar.openFromComponent(AlertComponent, {
            data: {res },
            panelClass: ["mt-0", "p-0" , "alert-center", "alert-danger" ]  
          });
         } else {
          
        this.usuario = res;
        this.userStoreService.setUser(res);
        this.router.navigate(["/usuarios", this.usuario.data.nombre]);
        this.snackbar.openFromComponent(AlertComponent, {
          data: {res },
          panelClass: ["mt-0", "p-0" , "alert-center" , "alert-primary"]  
        });
        }
        },
       err => console.log(err)
     )
   }

  errorMail(){
    return this.loginForm.controls.mail.hasError("required") ? "Campo vacio" : this.loginForm.controls.mail.hasError("email") ? "Mail invalido": "";
  } 

  errorPassword(){
    return this.loginForm.controls.password.hasError("required") ? "Campo vacio" :  "";
  }

  recuperarPassword(){
    let balanceModal = this.dialog.open(RecuperarpasswordComponent,{
      width: "370px",
      height: "280px",
      data: {mail: this.loginForm.controls.mail.value  }
    });

    balanceModal.afterClosed().subscribe(
      res => { if (res == undefined) return; 
        else if (res.hasOwnProperty("message"))
        this.snackbar.openFromComponent(AlertComponent,{
          data : {res},
          panelClass: ["mt-0", "p-0" , "alert-center" , "alert-warning"]
        })
      }
    )
  }
}
