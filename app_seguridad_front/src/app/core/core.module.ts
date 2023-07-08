import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { WindowRef } from './db/WindowRef';
import { DbService } from './db/db.service';
import { SessionCloudService } from './security/session-cloud.service';
import { SessionLocalService } from './security/session-local.service';
import { SessionWebService } from './security/session-web.service';
import { SettingsService } from './settings/settings.service';
import { SessionDbService } from './db/session-db.service';
import { throwIfAlreadyLoaded } from './import.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SettingsService,
    SessionWebService,
    SessionLocalService,
    SessionCloudService,
    DbService,
    SessionDbService,
    WindowRef,
    MessageService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
