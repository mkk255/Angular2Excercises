import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ContactsService } from '../contacts.service';
import { Contact } from '../models/contact';

import { ApplicationState } from '../state-management';
import { ContactsQuery } from '../state-management/contacts/contacts.reducer';

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  contact$: Observable<Contact>;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.contact$ = this.store.select(ContactsQuery.getSelectedContact);
  }
}
