import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ContactsAppComponent } from './contacts.component';
import { ContactsService } from './contacts.service';

@NgModule({
  declarations: [ContactsAppComponent],
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  providers: [ContactsService],
  bootstrap: [ContactsAppComponent]
})
export class ContactsModule {

}
