import { Injectable } from '@angular/core';
import {Usuario} from "../models/usuario"
import {BehaviorSubject} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  
  constructor() { }

  

  private user = new BehaviorSubject<any>("")

   user$ = this.user.asObservable()

   setUser(user) {
     return this.user.next(user.data);
  }

   getUser() {
    return this.user.getValue();
  }

   deleteUSer(nada) {
    return this.user.next(nada);
  }
}
