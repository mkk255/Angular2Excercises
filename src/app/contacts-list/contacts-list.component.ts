import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';

import { ApplicationState } from '../state-management';
import { LoadContactsSuccessAction } from '../state-management/contacts/contacts.actions';
import { ContactsQuery } from '../state-management/contacts/contacts.reducer';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts$: Observable<Array<Contact>>;

  constructor(private store: Store<ApplicationState>, private contactsService: ContactsService) { }

  ngOnInit() {
    this.contacts$ = this.store.select(ContactsQuery.getContacts);

    this.contactsService.getContacts()
      .subscribe(contacts => this.store.dispatch(new LoadContactsSuccessAction(contacts)));
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
