import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';

@Component({
  moduleId: module.id,
  selector: 'trm-contacts-detail',
  templateUrl: 'contacts-detail.component.html',
  styleUrls: ['contacts-detail.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class ContactsDetailComponent implements OnInit {

  contact: Contact;

  constructor(private contactsService: ContactsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.contact = this.contactsService.getContact(this.route.snapshot.params['id']);
  }

}
