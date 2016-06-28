import { Component, OnInit } from '@angular/core';
import { ContactsHeaderComponent } from './contacts-header';
import { Contact } from './models/contact';
import { ContactsService } from './contacts.service';

@Component({
  moduleId: module.id,
  selector: 'trm-contacts-app',
  templateUrl: 'contacts.component.html',
  styleUrls: ['contacts.component.css'],
  directives: [ContactsHeaderComponent],
  providers: [ContactsService]
})
export class ContactsAppComponent implements OnInit {

  contacts: Array<Contact>;

  constructor(private contactsService: ContactsService) {}

  ngOnInit () {
    this.contacts = this.contactsService.getContacts();
  }
}
