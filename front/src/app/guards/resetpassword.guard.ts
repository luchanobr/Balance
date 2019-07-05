import { Injectable } from '@angular/core';
import { CanActivate, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import {map}  from "rxjs/operators"
import { UsuariosService } from '../services/usuarios.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordGuard implements CanActivate{

  constructor(private usuariosServices: UsuariosService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      return this.usuariosServices.authResetPassword(next.paramMap.get("token"), next.paramMap.get("usuario_id")).pipe(map((res)=>{
        if (res == false)
       { this.router.navigate(["/login"])
        console.log(res)
        return false}
        else return true
       })
      )

  }
  
}
