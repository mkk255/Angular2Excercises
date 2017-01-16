import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../models/contact';
import { EventBusService } from '../event-bus.service';
import { ContactsService } from '../contacts.service';

import 'rxjs/add/operator/merge';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts: Observable<Array<Contact>>;
  private terms$ = new FormControl();

  constructor(private contactsService: ContactsService, private eventBusService: EventBusService) {}

  ngOnInit () {
    this.contacts = this.contactsService.search(this.terms$.valueChanges)
                                        .merge(this.contactsService.getContacts());

    this.eventBusService.emit('appTitleChange', 'Contacts');

    this.eventBusService
        .observe('contactAdded')
        .merge(this.eventBusService.observe('contactUpdated'))
        .subscribe(() => {
          // We merge the fetch call so we keep the search stream
          this.contacts = this.contacts.merge(this.contactsService.getContacts());
        });
  }

  trackByContactId(index, contact) {
    return contact.id;
  }

  search(term: string) {
    this.contacts = this.contactsService.rawSearch(term);
  }
}
