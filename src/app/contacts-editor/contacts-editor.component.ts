import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { EventBusService } from '../event-bus.service';

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  contact: Contact;
  warnOnClosing = true;

  constructor(private contactsService: ContactsService,
              private eventBusService: EventBusService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
        .map(data => data['contact'])
        .subscribe(contact => {
          this.contact = contact;
          this.eventBusService.emit('appTitleChange', `Editing: ${contact.name}`);
        });
  }

  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  save(contact: Contact) {
    this.warnOnClosing = false;
    this.contactsService.updateContact(contact)
                        .subscribe(() => this.goToDetails(contact));
  }

  private goToDetails(contact: Contact) {
    this.router.navigate(['/contact', contact.id ]);
  }
}

