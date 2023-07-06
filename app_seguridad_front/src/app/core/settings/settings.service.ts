import { Injectable } from "@angular/core";
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class SettingsService {
  private app: any;
  private session: any;

  public urlSessionOn: any;
  public loader: boolean = false;
  public CONSTANTES: any[];
  public API_URL_SEGURIDAD: any;

  constructor(private spinnerService: NgxSpinnerService) {
    this.app = {
      name: 'App Seguridad',
      description: 'App Seguridad',
      logo: 'assets/images/logo-icon.svg',
      version: '1.0.0',
      aplicacion: 'SEGURIDAD',
      cache: false,
      timeout: 60000,
    };

    this.session = {};

    this.API_URL_SEGURIDAD = (function () {
      return {
        // Sesion
        'api_sesionCloud_login': 'api/auth/login',
        'api_sesionCloud_obtenerSesion': 'api/sesionCloud/obtenerSesion',
        'api_sesionCloud_invalidate': 'api/sesionCloud/invalidate',
        'api_sesionWeb_obtenerSesion': 'api/sesion/obtenerSesion',
        'api_sesionWeb_obtenerMenu': 'api/sesion/obtenerMenu',
        'api_sesionCloud_token': 'api/sesionCloud/token'
      }
    })();

    this.CONSTANTES = [];
    this.CONSTANTES['APLICACION'] = this.app;
    this.CONSTANTES['API_URL_SEGURIDAD'] = this.API_URL_SEGURIDAD;
  }

  getAppSetting(name) {
    return name ? this.app[name] : this.app;
  }

  setAppSetting(name, value) {
    if (typeof this.app[name] !== 'undefined') {
      this.app[name] = value;
    }
  }

  getSesion() {
    return this.session;
  }

  setSession(session: any) {
    this.session = Object.assign({}, session);
    this.session.username = this.session.strPv_username;
  }

  setUrlSessionOn(urlSessionOn: string) {
    this.urlSessionOn = urlSessionOn;
  }

  getUrlSessionOn() {
    return this.urlSessionOn;
  }

  getConstantesByDominioKey(dominio, key) {
    if (typeof this.CONSTANTES[dominio] !== 'undefined') {
      return (this.CONSTANTES[dominio])[key];
    }
  }

  public mostrarSpinner(): void {
    this.spinnerService.show();
  }

  public ocultarSpinner(): void {
    this.spinnerService.hide();
  }

  public getUsername() {
    return this.session.strPv_username;
  }

  public getFullname() {
    return this.session.strPv_fullname;
  }
}

