import { Component, OnInit, Inject } from '@angular/core';
import { BalancesService } from 'src/app/services/balances.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Balance } from 'src/app/models/balance';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from "@angular/material";
import {AlertComponent} from "../alert/alert.component";


@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {


  conceptosGastos:any
  conceptosIngresos: any
  formas: any 
  message: any
  hoy = Date.now()
  constructor(private balanceService: BalancesService, private fb :FormBuilder, public dialogRef: MatDialogRef<BalanceComponent> , @Inject(MAT_DIALOG_DATA) public data: any, private snackbar : MatSnackBar) { }
  
  ngOnInit() {
   this.positive()
   this.balanceService.getConceptosGastos().subscribe(
    res => this.conceptosGastos = res,
    err => console.log(err)
  ) 
   this.balanceService.getConceptosIngresos().subscribe(
    res => this.conceptosIngresos = res,
    err => console.log(err)
  ) 
  this.balanceService.getFormas().subscribe(
    res => this.formas = res,
    err => console.log(err)
    )
  }

  balanceForm = this.fb.group({
    tipo: ["0", [Validators.required]],
    balance_id: [this.data.balance.balance_id],
    usuario_id: [this.data.usuario_id],
    monto: [this.data.balance.monto || 0, [Validators.required, Validators.pattern("^[0-9]+(\[.][0-9][0-9]?)?$")]],
    fecha: [this.data.balance.fecha, Validators.required],
    concepto: [this.data.balance.concepto, Validators.required],
    forma: [this.data.balance.forma, Validators.required]
  })
  
  positive(){
    if (this.balanceForm.controls.monto.value < 0)  return this.balanceForm.patchValue({"monto":this.balanceForm.controls.monto.value *-1 });
  }

  sendBalance(balanceForm: Balance) {
    if (this.balanceForm.controls.tipo.value == 0) {
      console.log("gasto")
      let data = balanceForm
      data.monto = data.monto*-1 
      this.balanceService.setBalance(data).subscribe(
      res=>  this.snackbar.openFromComponent(AlertComponent, {
            data: {res},
            panelClass: ["mt-0", "p-0" , "alert-center", "alert-info" ]  
          }),
      err => console.log(err)
    )} 
    else if (this.balanceForm.controls.tipo.value == 1) {
      console.log("ingreso")
      this.balanceService.setBalance(balanceForm).subscribe(
      res =>  this.snackbar.openFromComponent(AlertComponent, {
        data: {res},
        panelClass: ["mt-0", "p-0" , "alert-center", "alert-info" ]  
      }),
      err => console.log(err)
    )}
  }
}
