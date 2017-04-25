import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/withLatestFrom';

import { ContactsService } from '../../contacts.service';
import { Contact } from 'app/models/contact';

import { ApplicationState } from '../index';
import { ContactsQuery } from './contacts.reducer';

import {
  SelectContactAction,
  AddContactAction,
  LoadContactsSuccessAction,
  UpdateContactAction
} from './contacts.actions';

@Injectable()
export class ContactsProxy {
  contacts$ = this.store.select(ContactsQuery.getContacts);
  selectedContact$ = this.store.select(ContactsQuery.getSelectedContact);
  loaded$ = this.store.select(ContactsQuery.getLoaded);

  constructor(private store: Store<ApplicationState>,
    private contactsService: ContactsService) { }

  getContact(contactId: string): Observable<Contact> {
    this.selectContact(contactId);

    return this.loaded$
      .take(1)
      .withLatestFrom(this.selectedContact$)
      .switchMap(([loaded, selectedContact]) => {
        let addContactToList = (contact: Contact) => {
          if (!selectedContact) {
            this.store.dispatch(new AddContactAction(contact));
          }
        }

        let getContact = (id: string) => this.contactsService
          .getContact(contactId)
          .do(addContactToList);

        return loaded ? Observable.of(null) : getContact(contactId);
      })
      .switchMap(() => this.selectedContact$);
  }

  getContacts(): Observable<Array<Contact>> {
    return this.loaded$
      .take(1)
      .switchMap(loaded => {
        let addContactsToList = (contacts: Array<Contact>) =>
          this.store.dispatch(new LoadContactsSuccessAction(contacts));

        let getContacts = () => this.contactsService
          .getContacts()
          .do(addContactsToList);

        return loaded ? Observable.of(null) : getContacts();
      })
      .switchMap(() => this.contacts$);
  }

  updateContact(contact: Contact): Observable<boolean> {
    /**
     * Notice, we no longer inject the router and navigate back to
     * the details view. This is not the responsibility of the facade
     * but the component.
     */
    return this.contactsService.updateContact(contact)
      .map(() => {
        this.store.dispatch(new UpdateContactAction(contact));

        return true;
      })
      .catch(() => Observable.of(false));
  }

  private selectContact(id: string): void {
    this.store.dispatch(new SelectContactAction(+id));
  }
}
