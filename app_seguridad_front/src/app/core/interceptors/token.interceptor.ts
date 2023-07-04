import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SessionLocalService } from "../security/session-local.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private localService: SessionLocalService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let token = this.localService.getToken();
    if (token != null) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
        //.append('Content-Type', 'application/json')
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
