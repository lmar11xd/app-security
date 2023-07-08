import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { SessionLocalService } from 'src/app/core/security/session-local.service';
import { SettingsService } from 'src/app/core/settings/settings.service';
import { Constantes } from 'src/app/helpers/constantes';
import { AuthLayoutService } from 'src/app/layouts/auth-layout/auth-layout.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  formulario: FormGroup;

  constructor(
    private router: Router,
    private localSessionService: SessionLocalService,
    private messageService: MessageService,
    private settingsService: SettingsService,
    private service: AuthLayoutService,
  ) {}

  ngOnInit() {
    this.verificarSession();
    this.crearFormulario();
  }

  ngOnDestroy() {
  }

  verificarSession() {
    const session = this.localSessionService.obtenerSesionActual();
    this.localSessionService.actualizarSesion(session);
    const isAuth = this.localSessionService.isAuthenticated();
    if(isAuth) this.router.navigate([Constantes.P_PAGE_INIT]);
  }

  crearFormulario() {
    this.formulario = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      rememberMe: new FormControl(false)
    });
  }

  inicializarFormulario() {
    this.formulario.controls['username'].patchValue('', {onlySelf: true});
    this.formulario.controls['password'].patchValue('', {onlySelf: true});
    this.formulario.controls['rememberMe'].patchValue(false, {onlySelf: true});
  }

  limpiarValidadores() {
    this.formulario.controls['username'].clearValidators();
    this.formulario.controls['password'].clearValidators();
    this.formulario.controls['rememberMe'].clearValidators();
  }

  refrescarValidadores() {
    this.formulario.controls['username'].updateValueAndValidity();
    this.formulario.controls['password'].updateValueAndValidity();
    this.formulario.controls['rememberMe'].updateValueAndValidity();
  }

  inicializarValidaciones() {
    this.limpiarValidadores();
    this.formulario.controls['username'].setValidators([Validators.required]);
    this.formulario.controls['password'].setValidators([Validators.required]);
    this.refrescarValidadores();
  }

  login() {
    this.inicializarValidaciones();
    this.formulario.markAllAsTouched();

    const isValid = this.formulario.valid;
    console.log(isValid);
    if(!isValid) {
      this.messageService.add({
        severity: "warn",
        summary: "Revisar:",
        detail: "Por favor, completar los campos obligatorios"
      });
      return;
    }

    const form = this.formulario.value;
    const request = {
      appCode: environment.appCode,
      ...form
    }
    console.log(request);

    this.settingsService.mostrarSpinner();
    lastValueFrom(this.service.login(request))
    .then((response: any) => {
      this.settingsService.ocultarSpinner();
      console.log(response);
      if(response.status === Constantes.P_STATUS_OK) {
        //Grabar Session
        this.localSessionService.grabarSesion(response, true);
        this.messageService.add({
          severity: Constantes.P_ALERT_SUCCESS,
          summary: "Autenticado",
          detail: "Bienvenido al portal"
        });
        this.router.navigate([Constantes.P_PAGE_INIT]);
      } else {
        this.messageService.add({
          severity: Constantes.P_ALERT_WARN,
          summary: "Validación",
          detail: response.message
        });
      }
    })
    .catch((error) => {
      this.messageService.add({
        severity: Constantes.P_ALERT_ERROR,
        summary: Constantes.P_ERROR_SERVER,
        detail: "No se pudo iniciar sesión"
      });
    });
  }

}
