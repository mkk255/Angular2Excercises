import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Contact } from './models/contact';

import { API_ENDPOINT } from './app.tokens';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ContactsService {

  constructor(private http: Http, @Inject(API_ENDPOINT) private apiEndpoint) {}

  getContact (id: string) {
    return this.http.get(`${this.apiEndpoint}/contacts/${id}`)
                    .map(res => res.json().item);
  }

  getContacts () {
    return this.http.get(`${this.apiEndpoint}/contacts`)
                    .map(res => res.json())
                    .map(data => data.items);
  }

  updateContact(contact: Contact) {
    return this.http.put(`${this.apiEndpoint}/contacts/${contact.id}`, contact);
  }

  addContact(contact: Contact) {
    return this.http.post(`${this.apiEndpoint}/contacts`, contact);
  }

  search(term: Observable<string>, debounceMs = 400) {
    return term.debounceTime(debounceMs)
                .distinctUntilChanged()
                .switchMap(term => this.rawSearch(<string>term));
  }

  rawSearch(term: string) {
    return this.http.get(`${this.apiEndpoint}/search?text=${term}`)
                    .map(res => res.json())
                    .map(data => data.items);
  }

  isEmailAvailable(email: string) {
    return this.http.get(`${this.apiEndpoint}/check-email?email=${email}`)
                    .map(res => res.json());
  }
}
