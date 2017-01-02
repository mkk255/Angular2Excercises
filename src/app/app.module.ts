import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { ContactsAppComponent } from './contacts.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';

import { ContactsService } from './contacts.service';

import { APP_ROUTES } from './app.routes';
import { API_ENDPOINT } from './app.tokens';

@NgModule({
  declarations: [
    ContactsAppComponent,
    ContactsListComponent,
    ContactsDetailComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES),
    FlexLayoutModule.forRoot(),
    HttpModule
  ],
  providers: [
    ContactsService,
    { provide: API_ENDPOINT, useValue: 'http://localhost:4201/api' }
  ],
  bootstrap: [ContactsAppComponent]
})
export class ContactsModule {

}
