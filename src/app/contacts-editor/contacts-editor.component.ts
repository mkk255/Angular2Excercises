import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Contact } from '../models/contact';

import { ApplicationState } from '../state-management';
import { UpdateContactAction } from '../state-management/contacts/contacts.actions';
import { ContactsQuery } from '../state-management/contacts/contacts.reducer';
import { SaveContactAction } from 'app/state-management/contacts/contacts.actions';

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  contact$: Observable<Contact>;

  constructor(private router: Router,
    private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.contact$ = this.store.select(ContactsQuery.getSelectedContact);
  }

  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  save(contact: Contact) {
    this.store.dispatch(new SaveContactAction(contact));
  }

  private goToDetails(contact: Contact) {
    this.router.navigate(['/contact', contact.id ]);
  }
}
