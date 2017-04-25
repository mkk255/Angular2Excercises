import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Contact } from '../models/contact';

import { ContactsProxy } from '../state-management/contacts/contacts.proxy';

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  contact$: Observable<Contact>;

  constructor(private contactsProxy: ContactsProxy) { }

  ngOnInit() {
    this.contact$ = this.contactsProxy.selectedContact$;
  }
}
