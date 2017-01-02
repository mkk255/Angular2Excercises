import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { EventBusService } from '../event-bus.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'contacts-creator',
  templateUrl: './contacts-creator.component.html',
  styleUrls: ['./contacts-creator.component.css'],
})
export class ContactsCreatorComponent {

  constructor(
    private router: Router,
    private contactsService: ContactsService,
    private eventBusService: EventBusService
  ) {}

  save(value: Contact) {
    this.contactsService.addContact(value)
      .subscribe(() => {
        this.eventBusService.emit('contactAdded', null);
        this.router.navigate(['/'])
      });
  }
}
