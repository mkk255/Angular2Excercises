import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';

import { ContactsService } from "./contacts.service";
import { Contact } from 'app/models/contact';

import { ApplicationState } from "./state-management";

import {
  SelectContactAction,
  LoadContactsSuccessAction,
  AddContactAction
} from './state-management/contacts/contacts.actions';

@Injectable()
export class ContactExistsGuard implements CanActivate {

  constructor(public store: Store<ApplicationState>, private contactsService: ContactsService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    let contactId = route.paramMap.get('id');
    this.store.dispatch(new SelectContactAction(+contactId));

    return this.store.select(state => state.contacts.loaded)
      .take(1)
      .switchMap(loaded => {
        let addContactToList = (contact: Contact) => this.store.dispatch(new AddContactAction(contact));

        return loaded ? Observable.of(true) : this.contactsService
          .getContact(contactId)
          .do(addContactToList)
          .map(contact => !!contact);
      });
  }
}
