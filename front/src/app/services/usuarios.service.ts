import { Injectable } from '@angular/core';
import { Usuario } from "../models/usuario";
import { LoginUser } from "../models/login-user"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import {filter, map, tap} from "rxjs/operators"


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  
   headers = new HttpHeaders({
    'Content-Type': 'application/json',
    
   })

   url = "http://localhost:3000" 

  constructor(private http : HttpClient) { }

    login(user: LoginUser) {
      return this.http.post(`${this.url}/login`, user, { observe: "body", withCredentials: true, headers: this.headers}).pipe(
        tap((res: any) =>  localStorage.setItem("usuario", res.token))
      );
    }
  
    registro(user: Usuario) {
      return this.http.post(`${this.url}/registro`, user, { observe: "body", withCredentials: true, headers:this.headers });
    }

    logout(){
      return this.http.get(`${this.url}/logout`,{ observe: "body", withCredentials: true, headers:this.headers }).pipe(
        tap((res:any)=> localStorage.removeItem("usuario"))
      );
    }

    getGeneros() {
      return this.http.get(`${this.url}/usuario/balance/generos`, { observe: "body", withCredentials: true, headers:this.headers });
    }

    sendContacto(data) {
      return this.http.post(`${this.url}/contacto`, data, { observe: "body", withCredentials: true, headers:this.headers })
    }

    mailResetPassword(data){
      return this.http.post(`${this.url}/reset`, data, { observe: "body", withCredentials: true, headers:this.headers } )
    }

    resetPassword(data){ 
      return this.http.post(`${this.url}/reset/password`, data, { observe: "body", withCredentials: true, headers:this.headers })
    }

    authResetPassword(token, id){
      return this.http.get(`${this.url}/reset/auth/${id}`, { observe: "body", withCredentials: true, headers: new HttpHeaders({ 'Content-Type': 'application/json' }).append("authorization", token) } )
    }
}
