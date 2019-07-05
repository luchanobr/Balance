import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler,HttpRequest,HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthServiceService implements HttpInterceptor {

  constructor() { }

      intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

    const Token = localStorage.getItem("usuario");
    if (Token) {
      const cloned = req.clone({
          setHeaders: {"Authorization": `Beader ${Token}`}
      });
      return next.handle(cloned);
    }
    else {
      return next.handle(req);
      
    }
    }
  
}
