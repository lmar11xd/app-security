import { Injectable } from "@angular/core";
import { SidebarService } from "src/app/components/sidebar/sidebar.service";
import { SettingsService } from "../settings/settings.service";
import { SessionDbService } from "../db/session-db.service";
import { Utils } from "src/app/utils/utils";

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

  setObjPv_listaMenu(listaMenu) {
    this.session.objPv_listaMenu = listaMenu;
  }

  getObjPv_listaMenu() {
    return this.session.objPv_listaMenu;
  }

  grabarSesion(objA_session, isMovil : Boolean) {
    this.session = Object.assign({},objA_session);
    if(isMovil){
      this.sessionDbService.delete();
      this.sessionDbService.save(objA_session);
    } else {
      this.settings.setSession(this.session);
    }
  }

  actualizarSesion(objA_session) {
    this.session = Object.assign({}, objA_session);
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
    let blnL_flagTieneToken = false;
    this.session = this.obtenerSesionActual();
    if(this.session !== null && this.session.token !== null && typeof this.session.token !== 'undefined' && this.session.token !== '') {
      this.settings.setSession(this.session);
      this.menuService.setMenuItems(this.session.objPv_listaMenu);
      let ahora = new Date();
      let ahoraMiliseg = ahora.getTime();
      let diaSesion = new Date(this.session.expires_in);
      let diaSesionFin = new Date(diaSesion.getFullYear(),diaSesion.getMonth(),diaSesion.getDate(),23,59,59,0);
      if(diaSesionFin.getTime() > ahoraMiliseg){
        blnL_flagTieneToken = true;
      } else {
        this.borrarSesion();
      }
    }
    return blnL_flagTieneToken;
  }

  tieneSesionWeb() {
    let blnL_flagTienSesion = false;
    this.session = this.obtenerSesionActual();
    if (!Utils.isEmpty(this.session)) {
      blnL_flagTienSesion = true;
    }
    return blnL_flagTienSesion;
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.getToken());
    if (payload != null && payload.username && payload.username.length > 0) {
      return true;
    }
    return false;
  }
}
