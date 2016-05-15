import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ContactsAppComponent } from './contacts.component';

@NgModule({
  declarations: [ContactsAppComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    FlexLayoutModule
  ],
  bootstrap: [ContactsAppComponent]
})
export class ContactsModule {

}
