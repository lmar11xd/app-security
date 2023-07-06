import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { SessionLocalService } from "./core/security/session-local.service";
import { SessionWebService } from "./core/security/session-web.service";
import { SettingsService } from "./core/settings/settings.service";
import { SidebarService } from "./components/sidebar/sidebar.service";
import { Utils } from "./utils/utils";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router,
    private authServiceLocal: SessionLocalService,
    private authServiceWeb: SessionWebService,
    private settings: SettingsService,
    private menuService: SidebarService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.settings.setUrlSessionOn("");
    let sesionSSO = this.authServiceLocal.obtenerSesionActual();
    if(Utils.isEmpty(sesionSSO)) {
      console.log("No hay sesión");
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
          this.menuService.setMenuItems(response.objPv_sesion.objPv_listaMenu);
          this.authServiceLocal.grabarSesion(sesionSSO,true);
          if(this.settings.getUrlSessionOn().indexOf("home") > 0){
            this.router.navigate(["/"]);
          } else {
            this.router.navigate([this.settings.getUrlSessionOn()]);
          }
          return true;
        },
        err => {
          this.settings.ocultarSpinner();
          this.router.navigate(["login"]);
          return false;
        }
      );
    } else {
      console.log("Sesión encontrada");
      this.authServiceLocal.grabarSesion(sesionSSO,false);
      this.menuService.setMenuItems(sesionSSO.objPv_listaMenu);
      return true;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
