import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/takeUntil';

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
    this.contacts = this.terms$.debounceTime(400)
                               .distinctUntilChanged()
                               .switchMap(term => this.contactsService.search(term))
                               .merge(this.contactsService.getContacts().delay(5000).takeUntil(this.terms$))
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
