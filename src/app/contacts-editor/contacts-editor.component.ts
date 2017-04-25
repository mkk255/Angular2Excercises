import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Contact } from '../models/contact';

import { ContactsProxy } from '../state-management/contacts/contacts.proxy';

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  contact$: Observable<Contact>;

  constructor(private router: Router, private contactsProxy: ContactsProxy) { }

  ngOnInit() {
    this.contact$ = this.contactsProxy.selectedContact$;
  }

  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  save(contact: Contact) {
    this.contactsProxy.updateContact(contact)
      .subscribe(() => this.router.navigate(['/contact', contact.id]));
  }

  private goToDetails(contact: Contact) {
    this.router.navigate(['/contact', contact.id ]);
  }
}
