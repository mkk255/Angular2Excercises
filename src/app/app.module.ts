import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ContactsAppComponent } from './contacts.component';
import { ContactsHeaderComponent } from './contacts-header';
import { ContactsListComponent } from './contacts-list';
import { ContactsDetailComponent } from './contacts-detail';
import { ContactsEditorComponent } from './contacts-editor';
import { ContactsService } from './contacts.service';
import { ContactsAppRoutes } from './app.routes';
import { API_ENDPOINT } from './app.tokens';
import { APP_PROVIDERS } from './app.providers';
import { TabsComponent } from './tabs/tabs/tabs.component';
import { TabComponent } from './tabs/tab/tab.component';

@NgModule({
  declarations: [
    ContactsAppComponent,
    ContactsHeaderComponent,
    ContactsListComponent,
    ContactsDetailComponent,
    ContactsEditorComponent,
    TabsComponent,
    TabComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ContactsAppRoutes),
    HttpModule,
    FormsModule
  ],
  providers: [
    ContactsService,
    APP_PROVIDERS
  ],
  bootstrap: [ContactsAppComponent]
})
export class ContactsModule {

}
