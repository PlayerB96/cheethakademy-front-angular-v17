import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { BrowserStorageServerService } from './localstorage/browserstorageserver.service';
import { BrowserStorageService } from './localstorage/browserstorage.service';

const serverConfig: ApplicationConfig = {
  providers: [
    {
      provide: BrowserStorageService,
      useClass: BrowserStorageServerService,
    },
    // provideServerRendering(),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
