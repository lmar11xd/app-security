import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AuthLayoutService } from 'src/app/layouts/auth-layout/auth-layout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  formulario: FormGroup;

  constructor(private service: AuthLayoutService) {}

  ngOnInit() {
    this.crearFormulario();
  }

  ngOnDestroy() {
  }

  crearFormulario() {
    this.formulario = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      rememberMe: new FormControl()
    });
  }

  inicializarFormulario() {
    this.formulario.controls['username'].patchValue('', {onlySelf: true});
    this.formulario.controls['password'].patchValue('', {onlySelf: true});
    this.formulario.controls['rememberMe'].patchValue('', {onlySelf: true});
  }

  login() {
    const form = this.formulario.value;
    const request = {
      ...form
    }
    console.log(request);

    lastValueFrom(this.service.login(request))
    .then((response) => {
      //Grabar Session
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

}
