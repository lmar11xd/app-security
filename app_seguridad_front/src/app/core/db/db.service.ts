import { Injectable } from "@angular/core";
import { WindowRef } from "./WindowRef";

@Injectable()
export class DbService {

  constructor(private winRef: WindowRef) {
    this.init();
  }

  init() {}

  setItem(id, objeto) {
    this.winRef.nativeWindow.localStorage.setItem(id, JSON.stringify(objeto));
  }

  getItem(id) {
    let objeto = this.winRef.nativeWindow.localStorage.getItem(id);
    if( this.winRef.nativeWindow.localStorage.getItem(id) !== null ){
      return JSON.parse(objeto);
    } else {
      return null;
    }
  }

  removeItem(id){
    return this.winRef.nativeWindow.localStorage.removeItem(id);
  }
}
