import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'trm-contacts-app',
  template: `
    <md-toolbar color="primary">Contacts</md-toolbar>
    <md-list>
      <md-list-item *ngFor="let contact of contacts; trackBy:trackByContactId">
        <img md-list-avatar [src]="contact.image" alt="Picture of {{contact.name}}" class="circle">
        <h3 md-line>{{contact.name}}</h3>
      </md-list-item>
    </md-list>
  `,
  styleUrls: ['./app.component.scss']
})
export class ContactsAppComponent implements OnInit {

  contacts: Array<Contact>;

  constructor(private contactsService: ContactsService) {}

  ngOnInit () {
    this.contacts = this.contactsService.getContacts();
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
