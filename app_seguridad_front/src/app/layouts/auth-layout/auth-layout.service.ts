import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthLayoutService {
  constructor (public http: HttpClient) {
  }

  public login(request: any) {
    const url = environment.apiBaseUrl + 'auth/login';
    return this.http.post(url, request);
  }
}
