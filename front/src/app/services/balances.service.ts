import { Injectable } from '@angular/core';
import {UserStoreService} from "./user-store.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Balance} from "../models/balance";

@Injectable({
  providedIn: 'root'
})
export class BalancesService {
 
 
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
   })
  url = "http://localhost:3000/usuario/balance"

  constructor(private userStoreService: UserStoreService, private http: HttpClient) { }

  getBalances(){
    return this.http.get(`${this.url}`, { observe: "body", withCredentials: true, headers:this.headers } );
  }

  setBalance(data: Balance){
    return this.http.post(`${this.url}`, data, { observe: "body", withCredentials: true, headers:this.headers });
  }

  deleteBalance(balance_id) {
    return this.http.delete(`${this.url}/${balance_id}`, { observe: "body", withCredentials: true, headers:this.headers});
  }

  editBalance(data){
    return this.http.put(`${this.url}`,data, { observe: "body", withCredentials: true, headers:this.headers });
  }

  getConceptosGastos(){
    return this.http.get(`${this.url}/conceptos/gastos`, { observe: "body", withCredentials: true, headers:this.headers });
  }

  getConceptosIngresos(){
    return this.http.get(`${this.url}/conceptos/ingresos`, { observe: "body", withCredentials: true, headers:this.headers });
  }

  getFormas(){
    return this.http.get(`${this.url}/formas`, { observe: "body", withCredentials: true, headers:this.headers });
  }

  filtrarBalances(data){
    return this.http.post(`${this.url}/filter`, data, { observe: "body", withCredentials: true, headers:this.headers })
  }
}
