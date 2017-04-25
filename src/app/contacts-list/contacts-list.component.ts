import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Contact } from '../models/contact';

import { ContactsProxy } from '../state-management/contacts/contacts.proxy';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts$: Observable<Array<Contact>>;

  constructor(private contactsProxy: ContactsProxy) { }

  ngOnInit() {
    this.contacts$ = this.contactsProxy.getContacts();
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
