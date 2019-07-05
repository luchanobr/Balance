import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from "@angular/material";
import {FormControl, FormGroup, Validators, NgForm} from "@angular/forms";
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-recuperarpassword',
  templateUrl: './recuperarpassword.component.html',
  styleUrls: ['./recuperarpassword.component.css']
})
export class RecuperarpasswordComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RecuperarpasswordComponent> , @Inject(MAT_DIALOG_DATA) public data: any, private usuariosServices : UsuariosService ) { }

  ngOnInit() {
  }

 mailForm = new FormGroup({
   mail: new FormControl("",[Validators.required,Validators.email])
 })

 sendMail(data: NgForm){
   this.usuariosServices.mailResetPassword(data).subscribe
   (res => {
    if (res.hasOwnProperty("error")) this.dialogRef.close(res)
    else { 
      this.dialogRef.close(res) }
   }),
   err => {
     this.dialogRef.close(err)
   }
 }

 errorMail(){
  return this.mailForm.controls.mail.hasError("required") ? "Campo requerido" : this.mailForm.controls.mail.hasError("email") ? "Mail invalido": "";
} 

}
