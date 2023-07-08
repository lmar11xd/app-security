import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { SessionLocalService } from "../security/session-local.service";
import { SettingsService } from "../settings/settings.service";
import { Router } from "@angular/router";
import { MessageService } from 'primeng/api';
import { Constantes } from "src/app/helpers/constantes";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localService: SessionLocalService,
    private messageService: MessageService,
    private router: Router,
    private settingsService: SettingsService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {


    return next.handle(req).pipe(
      catchError(e => {
        if (e.status == 401) {

          if (this.localService.isAuthenticated()) {
            this.localService.borrarSesion();
          }

          this.router.navigate(['/login']);
        }

        if (e.status == 403) {
          this.messageService.add({
            severity: "error",
            summary: "Error en el Servidor",
            detail: `No tienes acceso a este recurso!`
            });
          this.router.navigate([Constantes.P_PAGE_INIT]);
        }
        return throwError(() => e);
      })
    );
  }
}
