import { Component } from '@angular/core';
import { ContactsHeaderComponent } from './contacts-header';
import { Contact } from './models/contact';
import { CONTACT_DATA } from './data/contact-data';

@Component({
  moduleId: module.id,
  selector: 'trm-contacts-app',
  templateUrl: 'contacts.component.html',
  styleUrls: ['contacts.component.css'],
  directives: [ContactsHeaderComponent]
})
export class ContactsAppComponent {

  contacts: Array<Contact> = CONTACT_DATA;
}
