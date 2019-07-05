import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import {UserStoreService} from "../services/user-store.service"


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor (private userStoreService : UserStoreService, private router : Router, private route : ActivatedRoute) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const user = this.userStoreService.getUser()
      const usuario = next.params.usuario

      if (user.nombre == usuario) {
          return true;
      } else {
          this.router.navigate(["/login"]);
          return false;

      }

  }
  
}
