import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { SessionLocalService } from "./core/security/session-local.service";
import { SessionWebService } from "./core/security/session-web.service";
import { SettingsService } from "./core/settings/settings.service";
import { SidebarService } from "./components/sidebar/sidebar.service";
import { Utils } from "./helpers/utils";

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
    let session = this.authServiceLocal.obtenerSesionActual();
    if(Utils.isEmpty(session)) {
      this.settings.setUrlSessionOn(state.url);
      this.settings.mostrarSpinner();
      Promise.all([
        this.authServiceWeb.obtenerSesion().toPromise()
      ]).then(
        data => {
          var response: any;
          response = data[0];
          this.settings.ocultarSpinner();
          let sesionSSO = Object.assign({}, response.session);
          this.menuService.setMenuItems(response.session.menuOptions);
          this.authServiceLocal.grabarSesion(sesionSSO,true);
          if(this.settings.getUrlSessionOn().indexOf("dashboard") > 0){
            this.router.navigate(["/"]);
          } else {
            this.router.navigate([this.settings.getUrlSessionOn()]);
          }
          return true;
        },
        err => {
          this.settings.ocultarSpinner();
          this.router.navigate(["/login"]);
          return false;
        }
      );
    } else {
      this.authServiceLocal.grabarSesion(session, false);
      this.menuService.setMenuItems(session.menuOptions);
      return true;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
