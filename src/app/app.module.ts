import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { StoreModule, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { ContactsAppComponent } from './app.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';
import { ContactsEditorComponent } from './contacts-editor/contacts-editor.component';

import { ContactsService } from './contacts.service';
import { ContactExistsGuard } from './contact-exists.guard';

import { APP_ROUTES } from './app.routes';
import { API_ENDPOINT } from './app.tokens';

import { ROOT_REDUCER } from './state-management';

const MIDDLEWARE = !environment.production
  ? [storeFreeze, combineReducers]
  : [combineReducers];

const COMPOSED_REDUCER = compose(...MIDDLEWARE)(ROOT_REDUCER);

/**
 * This function is required for AoT and can be statically analysed
 */
export function getComposedReducer(state: any, action: any) {
  return COMPOSED_REDUCER(state, action);
}

@NgModule({
  declarations: [
    ContactsAppComponent,
    ContactsListComponent,
    ContactsDetailComponent,
    ContactsEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot(APP_ROUTES),
    StoreModule.provideStore(getComposedReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    HttpModule,
    FormsModule
  ],
  providers: [
    ContactsService,
    { provide: API_ENDPOINT, useValue: 'http://localhost:4201/api' },
    ContactExistsGuard
  ],
  bootstrap: [ContactsAppComponent]
})
export class ContactsModule {

}
