import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class SessionCloudService {

	constructor(private http: HttpClient) {}

  login(request) {
    const url = environment.apiBaseUrl + 'api/auth/login';
    return this.http.post(url, request);
  }

  token(request) {
    const url = environment.apiBaseUrl + 'api/auth/token';
    return this.http.post(url, request);
  }

}
