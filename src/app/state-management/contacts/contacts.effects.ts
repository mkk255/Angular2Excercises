import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { ContactsService } from '../../contacts.service';
import { Contact } from '../../models/contact';

import {
  ContactsActionTypes,
  LoadContactsSuccessAction,
  UpdateContactAction
} from '../contacts/contacts.actions';

@Injectable()
export class ContactsEffects {
  constructor(
    private actions$: Actions,
    private contactsService: ContactsService,
    private router: Router) {
  }

  @Effect() getContacts$ = this.actions$
    .ofType(ContactsActionTypes.LOAD_CONTACTS)
    .switchMap(payload => this.contactsService.getContacts())
    .map((contacts: Array<Contact>) => new LoadContactsSuccessAction(contacts));

  @Effect() saveContact$ = this.actions$
    .ofType(ContactsActionTypes.SAVE_CONTACT)
    .map(toPayload)
    .switchMap((contact: Contact) => this.contactsService.saveContact(contact))
    .do((contact: Contact) => this.router.navigate(['/contact', contact.id]))
    .map((contact: Contact) => new UpdateContactAction(contact));
}
