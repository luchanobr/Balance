import { Component, OnInit, ViewChild } from '@angular/core';
import {Balance} from "../../models/balance";
import {BalancesService } from "../../services/balances.service";
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {BalanceComponent} from "../balance/balance.component";
import { UserStoreService } from 'src/app/services/user-store.service';
import {MatSnackBar} from "@angular/material";
import {AlertComponent} from "../alert/alert.component";
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { FormGroup, FormControl } from '@angular/forms';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import * as _moment from "moment";
import { Moment} from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class UsuarioComponent implements OnInit {

  balances: any 
  usuario: any
  sort: []
  showBarChart: boolean = false;
  totalData: number
  showPieChart:boolean = false
  formas: any
  todosConceptos:any = [ {}, {}]
  moment =  _moment;
  constructor(private balanceService :BalancesService, public dialog: MatDialog, private userStoreService: UserStoreService, private snackbar : MatSnackBar) {  
   
}

 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
 @ViewChild(MatSort, {static: false} ) set content(sort: MatSort) {
  this.balances.sort = sort;
 }

  ngOnInit() {
    this.balanceService.getBalances().subscribe(
      (res: Balance[]) => {this.balances = new MatTableDataSource<Balance>(res);
      this.balances.paginator = this.paginator;
      },
      err => console.log(err)
    )
    this.usuario = this.userStoreService.getUser()
    this.balanceService.getConceptosGastos().subscribe(
      res => {this.todosConceptos[0] = res
       Object.defineProperty(this.todosConceptos[0], "tipo", {value: "Conceptos Gastos" } )
      }
    )
    this.balanceService.getConceptosIngresos().subscribe(
      res =>{ this.todosConceptos[1] = res
        Object.defineProperty(this.todosConceptos[1], "tipo", {value: "Conceptos Ingresos" } )
        }
    )
    this.balanceService.getFormas().subscribe(
      res=> this.formas = res
    )
  }

  displayedColumns= ["monto", "fecha", "concepto", "forma", "edit", "delete"]

  agregarBalance(){
    let balanceModal = this.dialog.open(BalanceComponent,{
      width: "370px",
      height: "600px",
      data: {  usuario_id: this.usuario.usuario_id, titulo : "Agregar Balance", balance : "" }
    });

    balanceModal.afterClosed().subscribe(
      res => this.getBalances()
    )

  }

  openEditarBalance(balance: Balance){
    let balanceModal = this.dialog.open(BalanceComponent,{
      width: "370px",
      height: "650px",
      data: { usuario_id: this.usuario.usuario_id, titulo: "Editar Balance", balance: balance}
    })
    balanceModal.afterClosed().subscribe(
      res => this.getBalances()
    )
  }

  deleteBalance(balance_id : number){
    this.balanceService.deleteBalance(balance_id).subscribe(
      res =>{ 
        this.snackbar.openFromComponent(AlertComponent, {
          data: {res},
          panelClass: ["mt-0", "p-0" , "alert-center", "alert-info" ]  
        }),
      this.getBalances()
    },
      err => console.log(err)
    )
  }

   getBalances(){
    this.balanceService.getBalances().subscribe(
      (res: Balance[] ) => {
      
        this.balances = new MatTableDataSource<Balance>(res);
        this.balances.paginator = this.paginator;
        this.balances.sort = this.sort;
       },
      err => console.log(err)
    ) 
   }  
  
   getTotal() {
    let data: Balance[] = this.balances.data
    return data.map(balance => balance.monto).reduce((acc, value) => acc + value, 0);
  }
  
  searchTable(search: string){
    this.balances.filter = search.trim().toLowerCase()
  }

  filterForm = new FormGroup({
    usuario_id: new FormControl(""),
    monto: new FormControl(""),
    concepto: new FormControl(""),
    forma: new FormControl(""),
    fecha: new FormControl("")
  })

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.filterForm.controls.fecha.value;
    ctrlValue.year(normalizedYear.year());
    this.filterForm.patchValue({"fecha": ctrlValue});
  }

  cerrarDatePicker( normalizedMonth : Moment, datepicker){
    const ctrlValue = this.filterForm.controls.fecha.value;
    ctrlValue.month(normalizedMonth.month()).day(normalizedMonth.day());
    this.filterForm.patchValue({"fecha": ctrlValue});
    datepicker.close();
  }

  filtrarBalances(){
    this.filterForm.patchValue({usuario_id:this.usuario.usuario_id})
    let form = this.filterForm.value 
    this.balanceService.filtrarBalances(form).subscribe(
     (res: Balance[]| any) => {
        if(res.hasOwnProperty("error")){
          this.snackbar.openFromComponent(AlertComponent, {
            data: {res},
            panelClass: ["mt-0", "p-0" , "alert-center", "alert-info" ]  
          })} 
        else {
          this.balances = new MatTableDataSource<Balance>(res);
          this.balances.paginator = this.paginator
        };
        },
      err => console.log(err)
    )
  }

  createBarChart(){
    this.showBarChart = !this.showBarChart;
    let data = this.balances.data
    let gastos = data.filter(balance => balance.monto <0).map(balance=> balance.monto).reduce((acc, value) => acc + value, 0)*-1;
    let ingresos = data.filter(balance => balance.monto >0).map(balance=> balance.monto).reduce((acc, value) => acc + value, 0);
    let total = data.map(balance => balance.monto).reduce((acc, value) => acc + value, 0);
    this.barChartData= [
      { data: [gastos], label: 'Gastos' },
      { data: [ingresos], label: 'Ingresos' },
      { data: [total], label: "Total"}
    ];
  }

  createPieChart(){
    this.showPieChart = !this.showPieChart;
    let data = this.balances.data;
    let pieData
    let conceptos = [...new Set(data.filter(balance => balance.monto<0).map(balance => balance.concepto)) ];
    pieData = new Array(conceptos.length).fill(0)
    
    data.forEach(balance=> { 
        conceptos.forEach(concepto => { if (concepto == balance.concepto) pieData[conceptos.indexOf(concepto)]= pieData[conceptos.indexOf(concepto)]+balance.monto
        })
        
      });
    pieData = pieData.map(monto => monto *-1);
    this.pieChartLabels = conceptos;
    this.pieChartData = pieData;

  }
 
  public barChartOptions: ChartOptions = {
    responsive: true,
    
    scales: { xAxes: [{}], yAxes: [{}] },
    
  };
  public barChartLabels: Label[] = ["Balances"];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartColors = [{ backgroundColor: "#2C3E50"},{backgroundColor:"#3498DB"},{backgroundColor:"#fd7e14"}];

  public barChartData: ChartDataSets[] = [
  ];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    
  };
  public pieChartLabels
  public pieChartData: number[] 
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [{ backgroundColor: ["#2C3E50","#fd7e14","#3498DB","#18BC9C","#6610f2","#e83e8c","#95a5a6","#F39C12","#E74C3C","#6f42c1","#26c6da"]}]
  

}
