import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact } from '../models/contact';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

  contact: Contact;

  constructor(private contactsService: ContactsService, private route: ActivatedRoute) {}

  ngOnInit() {
    // We need to subscribe to params changes because this component is
    // reused when jumping between contacts. Hence ngOnInit isn't called
    this.route.paramMap
        .switchMap(paramMap => this.contactsService.getContact(paramMap.get('id')))
        .subscribe(contact => this.contact = contact);  }
}
