import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { ContactsHeaderComponent } from './contacts-header';
import { ContactsService } from './contacts.service';
import { APP_PROVIDERS } from './app.providers';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'trm-contacts-app',
  templateUrl: 'contacts.component.html',
  styleUrls: ['contacts.component.css'],
  directives: [ROUTER_DIRECTIVES, ContactsHeaderComponent],
  providers: [
    HTTP_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class ContactsAppComponent {

  constructor() {}

}
