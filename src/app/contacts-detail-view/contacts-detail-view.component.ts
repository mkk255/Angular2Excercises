import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact } from '../models/contact';
import { EventBusService } from '../event-bus.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'trm-contacts-detail-view',
  template: `
    <trm-contacts-detail [contact]="contact"
                    (edit)="navigateToEditor($event)"
                    (back)="navigateToList()">
    </trm-contacts-detail>
  `,
  styleUrls: ['./contacts-detail-view.component.css']
})
export class ContactsDetailViewComponent implements OnInit {

  contact: Contact;

  constructor(private contactsService: ContactsService,
                private eventBusService: EventBusService,
                private router: Router,
                private route: ActivatedRoute) {}

  ngOnInit() {
    // We need to subscribe to params changes because this component is
    // reused when jumping between contacts. Hence ngOnInit isn't called
    this.route.params
        .switchMap(params => this.contactsService.getContact(params['id']))
        .subscribe(contact => {
          this.contact = contact
          this.eventBusService.emit('appTitleChange', contact.name);
        });
  }

  navigateToList () {
    this.router.navigate(['/']);
  }

  navigateToEditor (contact) {
    this.router.navigate(['/contact', contact.id, 'edit']);
  }
}
