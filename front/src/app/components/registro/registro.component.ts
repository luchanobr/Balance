import { Component, OnInit } from '@angular/core';
import {UsuariosService} from "../../services/usuarios.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Usuario} from "../../models/usuario";
import { Router } from '@angular/router';
import {UserStoreService } from "../../services/user-store.service";
import {MatSnackBar} from "@angular/material";
import{ AlertComponent} from "../alert/alert.component"




@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})




export class RegistroComponent implements OnInit {

 
  message: {} = {message: ""}
  generos: any = []

  constructor(private fb: FormBuilder, private usuarioService: UsuariosService, private router : Router, private userStoreService : UserStoreService, private snackbar : MatSnackBar ) { }

  ngOnInit() {

      this.usuarioService.getGeneros().subscribe(
        res => this.generos = res,
        err => console.log(err)
      );
  }

  
  

  registroForm = this.fb.group({
    nombre: ["",[Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
    apellido: ["", [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
    mail: ["",[Validators.required,Validators.email]],
    password: ["",[Validators.required,Validators.minLength(4),Validators.maxLength(15)]],
    repetirPassword: ["",[Validators.required]],
    fecnac: ["",[Validators.required,]],
    genero: ["",[Validators.required]],
    telefono: ["",[Validators.required, Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")]]
  })
  
  
  confirmarPassword()  {
    if (this.registroForm.get("password").value=== this.registroForm.get("repetirPassword").value) {
      
      this.registroForm.get("repetirPassword").valid
    }

    else {
      this.registroForm.get("repetirPassword").setErrors({password: true})
    }

  }

  registro(registroForm: Usuario) {
    
    this.usuarioService.registro(registroForm).subscribe(
      res => {
        if (res.hasOwnProperty("error")) {
          this.snackbar.openFromComponent(AlertComponent, {
            data: {res },
            panelClass: ["mt-0", "p-0" , "alert-center", "alert-danger" ]  
          });
        } else {
          this.router.navigate(["/login"])
          this.snackbar.openFromComponent(AlertComponent, {
            data: {res},
            panelClass: ["mt-0", "p-0" , "alert-center", "alert-primary" ]  
          });
         
        }
      },
      err =>
       {let res = err
      this.snackbar.openFromComponent(AlertComponent, {
        data: {res },
        panelClass: ["mt-0", "p-0" , "alert-center", "alert-danger" ]  
      });
    })
  }

  errorNombre(){
    return this.registroForm.controls.nombre.hasError("required") ? "Campo requerido": 
    this.registroForm.controls.nombre.hasError("minlength") ? "Minimo 3 caracteres":
    this.registroForm.controls.nombre.hasError("maxlength") ? "Maximo 40 caracteres": "" ; 
  }

  errorApellido(){
   return this.registroForm.controls.apellido.hasError("maxlength") ? "Maximo 40 caracteres":
    this.registroForm.controls.apellido.hasError("minlength") ? "Minimo 3 caracteres":
    this.registroForm.controls.apellido.hasError("required") ? "Campo requerido": "";
  }
  
  errorMail() {
   return  this.registroForm.controls.mail.hasError("required") ? "Campo requerido":
    this.registroForm.controls.mail.hasError("email") ? "Mail invalido": "";
  }

  errorPassword(){
   return this.registroForm.controls.password.hasError("required") ? "Campo requerido":
    this.registroForm.controls.password.hasError("maxlength") ? "Maximo 15 caracteres":
    this.registroForm.controls.password.hasError("minlength") ? "Minimo 4 caracteres": "";
  }

  errorFecnac(){
     return this.registroForm.controls.fecnac.hasError("required") ? "Campo requerido": "";
  }

  errorGenero(){
     return this.registroForm.controls.genero.hasError("required") ? "Campo requerido": "";
  }

  errorTelefono(){
   return this.registroForm.controls.telefono.hasError("required") ? "Campo requerido":
    this.registroForm.controls.telefono.hasError("pattern") ? "Formato de telefono invalido":"";
  }
  errorRepetirPassword(){
    return this.registroForm.controls.repetirPassword.hasError("required")? "Campo requerido":
    this.registroForm.controls.repetirPassword.hasError("password")? "Passwords no coinciden" : "";
  }
}
