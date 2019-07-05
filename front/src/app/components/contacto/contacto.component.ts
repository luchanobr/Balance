import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from "@angular/forms";
import { UsuariosService } from "../../services/usuarios.service";
import { Router } from '@angular/router';
import {AlertComponent} from "../alert/alert.component"
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(private fb: FormBuilder, private usuarioService: UsuariosService, private router : Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  contactoForm = this.fb.group({
    nombre: ["", [Validators.required, Validators.maxLength(20)]],
    mail: ["",[Validators.required, Validators.email]],
    text: ["",[Validators.required, Validators.maxLength(300)]]
  })
 
  contacto(data){
    this.usuarioService.sendContacto(data).subscribe(
      res => {
      this.router.navigate(["/home"])
      this.snackbar.openFromComponent(AlertComponent, {
        data: {res},
        panelClass: ["mt-0", "p-0" , "alert-center", "alert-info" ]  
      });
      }
      ,
      err => console.log(err)
    )
  } 
  errorNombre(){
    return this.contactoForm.controls.nombre.hasError("required") ? "Campo requerido" : this.contactoForm.controls.nombre.hasError("maxlength") ? "Maximo 20 caracteres": "";
  } 
  errorMail(){
    return this.contactoForm.controls.mail.hasError("required") ? "Campo requerido" : this.contactoForm.controls.mail.hasError("email") ? "Mail no valido": "";
  } 
  errorText(){
    return this.contactoForm.controls.text.hasError("required") ? "Campo requerido" : this.contactoForm.controls.text.hasError("maxlength") ? "Maximo 300 caracteres": "";
  } 
}
