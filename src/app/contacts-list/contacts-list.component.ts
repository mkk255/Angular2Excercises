import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';

import 'rxjs/add/operator/merge';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts: Observable<Array<Contact>>;
  private terms$ = new Subject<string>();

  constructor(private contactsService: ContactsService) {}

  ngOnInit () {
    this.contacts = this.contactsService.search(this.terms$)
                                        .merge(this.contactsService.getContacts());
  }

  trackByContactId(index, contact) {
    return contact.id;
  }

  search(term: string) {
    this.contacts = this.contactsService.rawSearch(term);
  }
}