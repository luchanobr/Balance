import { Component, OnInit } from '@angular/core';
import {UsuariosService} from "../../services/usuarios.service"
import {FormGroup, FormControl, Validators, NgForm} from "@angular/forms";
import { Router, ActivatedRoute,} from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

    
    constructor(private usuariosServices : UsuariosService, private route :ActivatedRoute, private router : Router, private snackbar : MatSnackBar ) { }

  ngOnInit() {
  }
  
  resetPasswordForm = new FormGroup({
    usuario_id: new FormControl (this.route.snapshot.paramMap.get("usuario_id")),
    password: new FormControl("", [Validators.required, Validators.maxLength(15)]),
    repetirPassword: new FormControl("", [Validators.required, Validators.maxLength(15)])
  })

  
  resetPassword(data: NgForm){
    this.usuariosServices.resetPassword(data).subscribe(
    res=> {
      if (res.hasOwnProperty("error"))
     { 
       this.snackbar.openFromComponent(AlertComponent,{
        data : {res},
        panelClass: ["mt-0", "p-0" , "alert-center" , "alert-danger"]  
      })
      this.resetPasswordForm.reset()}
      else {
        this.snackbar.openFromComponent(AlertComponent,{
          data: {res},
          panelClass: ["mt-0", "p-0" , "alert-center" , "alert-primary"]  
        })
        this.router.navigate(["/login"])
      }
    },
    err => console.log(err)
      
    )
  }

  confirmarPassword()  {
    if (this.resetPasswordForm.get("password").value=== this.resetPasswordForm.get("repetirPassword").value) {
      
      this.resetPasswordForm.get("repetirPassword").valid
    }

    else {
      this.resetPasswordForm.get("repetirPassword").setErrors({password: true})
    }

  }
  errorRepetirPassword(){
    return this.resetPasswordForm.controls.repetirPassword.hasError("required")? "Campo requerido":
    this.resetPasswordForm.controls.repetirPassword.hasError("password")? "Passwords no coinciden" : "";
  }

  errorPassword(){
    return this.resetPasswordForm.controls.password.hasError("required") ? "Campo requerido":
     this.resetPasswordForm.controls.password.hasError("maxlength") ? "Maximo 15 caracteres":
     this.resetPasswordForm.controls.password.hasError("minlength") ? "Minimo 4 caracteres": "";
   }

}
