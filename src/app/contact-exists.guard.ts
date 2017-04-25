import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

import { ContactsProxy } from './state-management/contacts/contacts.proxy';

@Injectable()
export class ContactExistsGuard implements CanActivate {

  constructor(private contactsProxy: ContactsProxy) { }

  canActivate(route: ActivatedRouteSnapshot) {
    let contactId = route.paramMap.get('id');

    return this.contactsProxy.getContact(contactId)
      .map(contact => !!contact);
  }
}
