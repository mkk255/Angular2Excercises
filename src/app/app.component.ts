import { Component } from '@angular/core';
import { Contact } from './models/contact';
import { CONTACT_DATA } from './data/contact-data';

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
export class ContactsAppComponent {
  contacts: Array<Contact> = CONTACT_DATA;

  trackByContactId(index, contact) {
    return contact.id;
  }
}
