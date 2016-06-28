import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ContactsHeaderComponent } from './contacts-header';
import { ContactsService } from './contacts.service';

@Component({
  moduleId: module.id,
  selector: 'trm-contacts-app',
  templateUrl: 'contacts.component.html',
  styleUrls: ['contacts.component.css'],
  directives: [ROUTER_DIRECTIVES, ContactsHeaderComponent],
  providers: [ContactsService]
})
export class ContactsAppComponent {

  constructor() {}

}
