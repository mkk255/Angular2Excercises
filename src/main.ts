import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ContactsAppComponent, environment } from './app/';
import { ContactsAppRoutes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrap(ContactsAppComponent, [
  provideRouter(ContactsAppRoutes)
]);
