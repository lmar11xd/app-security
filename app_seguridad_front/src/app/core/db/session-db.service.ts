import { Injectable } from "@angular/core";
import { DbService } from "./db.service";

@Injectable()
export class SessionDbService {
  constructor(private dbService: DbService) {
  }

  save(session) {
    try {
      this.dbService.setItem('SESSION', session);
    } catch (error) {
    }
  }

  get() {
    let session: any;
    try {
      session = this.dbService.getItem('SESSION');
    } catch (error) {
    }
    return session;
  }

  delete() {
    try {
      this.dbService.removeItem('SESSION');
    } catch (error) {
    }
  }
}
