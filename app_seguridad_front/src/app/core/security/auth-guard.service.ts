import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { SessionLocalService } from "./session-local.service";
import { SettingsService } from "../settings/settings.service";
import { SessionWebService } from "./session-web.service";
import { Utils } from "src/app/utils/utils";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private authServiceLocal: SessionLocalService,
    private authServiceWeb: SessionWebService,
    private router: Router,
    private settings: SettingsService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.settings.setUrlSessionOn("");
      let sesionSSO = this.authServiceLocal.obtenerSesionActual();
      if (Utils.isEmpty(sesionSSO)) {
        this.settings.setUrlSessionOn(state.url);
        this.settings.mostrarSpinner();
        Promise.all([
          this.authServiceWeb.obtenerSesion().toPromise()
        ]).then(
          data => {
            var response: any;
            response = data[0];
            this.settings.ocultarSpinner();
            let sesionSSO = Object.assign({}, response.objPv_sesion);
            //this.menuService.addMenu(response.objPv_sesion.objPv_listaMenu);
            this.authServiceLocal.grabarSesion(sesionSSO, true);
            if(this.settings.getUrlSessionOn().indexOf("home")>0){
              this.router.navigate([""]);
            } else {
              this.router.navigate([this.settings.getUrlSessionOn()]);
            }
            return true;
          },
          err => {
            this.settings.ocultarSpinner();
            return false;
          }
        );
    } else {
      this.authServiceLocal.grabarSesion(sesionSSO, false);
      return true;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}
