import { Injectable } from "@angular/core";
import { SidebarService } from "src/app/components/sidebar/sidebar.service";
import { SettingsService } from "../settings/settings.service";
import { SessionDbService } from "../db/session-db.service";
import { Utils } from "src/app/helpers/utils";

@Injectable()
export class SessionLocalService {
  public session: any = {};

  constructor(
    private settings: SettingsService,
    private sessionDbService: SessionDbService,
    private menuService: SidebarService) {}

  setToken(token) {
    this.session.token = token;
  }

  getToken() {
    return this.session.token;
  }

  setExpires_in(expires_in) {
    this.session.expires_in = expires_in;
  }

  getExpires_in() {
    return this.session.expires_in;
  }

  setMenuOptions(listaMenu) {
    this.session.menuOptions = listaMenu;
  }

  getMenuOptions() {
    return this.session.menuOptions;
  }

  grabarSesion(session, isMovil: Boolean) {
    this.session = Object.assign({}, session);
    if(isMovil){
      this.sessionDbService.delete();
      this.sessionDbService.save(session);
    } else {
      this.settings.setSession(this.session);
    }
  }

  actualizarSesion(session) {
    this.session = Object.assign({}, session);
  }

  borrarSesion() {
    this.sessionDbService.delete();
    this.session = {};
  }

  obtenerSesionActual() {
    let session = null;
    session = this.sessionDbService.get();
    if(session == null) {
      this.session = {};
    } else {
      this.session = Object.assign({}, session);
    }
    return this.session;
  }

  tieneToken() {
    let hasToken = false;
    this.session = this.obtenerSesionActual();
    if(this.session !== null && this.session.token !== null && typeof this.session.token !== 'undefined' && this.session.token !== '') {
      this.settings.setSession(this.session);
      this.menuService.setMenuItems(this.session.menuOptions);
      let ahora = new Date();
      let ahoraMiliseg = ahora.getTime();
      let diaSesion = new Date(this.session.expires_in);
      let diaSesionFin = new Date(diaSesion.getFullYear(), diaSesion.getMonth(), diaSesion.getDate(), 23, 59, 59, 0);
      if(diaSesionFin.getTime() > ahoraMiliseg){
        hasToken = true;
      } else {
        this.borrarSesion();
      }
    }
    return hasToken;
  }

  tieneSesionWeb() {
    let hasSession = false;
    this.session = this.obtenerSesionActual();
    if (!Utils.isEmpty(this.session)) {
      hasSession = true;
    }
    return hasSession;
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      const arrayToken = accessToken.split(".");
      const dataToken = window.atob(arrayToken[1]);
      return JSON.parse(dataToken);
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    let payload = this.obtenerDatosToken(token);
    if (payload != null && payload.sub && payload.sub.length > 0) {
      return true;
    }
    return false;
  }
}
