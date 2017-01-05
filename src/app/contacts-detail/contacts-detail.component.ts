import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../models/contact';

import 'rxjs/add/operator/map';

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

  contact: Contact;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
        .map(data => data['contact'])
        .subscribe(contact => this.contact = contact);
  }
}
