import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpModule} from '@angular/http';
import {TestBed, inject} from '@angular/core/testing';

import {ContactsListComponent} from './contacts-list.component';
import {ContactsService} from '../contacts.service';
import {EventBusService} from '../event-bus.service';
import {API_ENDPOINT} from '../app.tokens';

// Load External Test Helper functions
import {createFixture, queryFor} from '../utils/testing/helpers';
import {DebugElement} from '@angular/core';

// Load Custom Jasmine Matchers
import {customMatchers, expect} from '../utils/testing/custom-matchers';

describe('ContactsListComponent', () => {
  let contactsService: ContactsService;
  let interceptAPI;

  beforeEach(() => {
    jasmine.addMatchers(customMatchers);

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpModule],
      declarations: [ContactsListComponent],
      providers: [
        ContactsService, EventBusService,
        {provide: API_ENDPOINT, useValue: 'http://localhost:4201/api'}
      ]
    });
  });
  beforeEach(inject([ContactsService], (_contactsService) => {
    // Build partial application to work with spyOn and intercept a service call
    interceptAPI = (method) => {
      let respondWith = (data) => {
        spyOn(_contactsService, method).and.returnValue(Observable.of(data));
      };
      return { respondWith };
    };
    contactsService = _contactsService;
  }));

  /**
   *  Each contact is rendered as an md-list-item with the following html:
   *  <a md-list-item
   *      <img md-list-avatar
   *           [src]="contact.image"
   *           alt="Picture of {{contact.name}}" class="circle">
   *      <h3 md-line>{{contact.name}}</h3>
   *  </a>
   *  Let's confirm the values are assigned properly for each list item
   */
  it('should fetch and display contacts', () => {
    let data;
    interceptAPI('getContacts').respondWith(data = [
      {id: 0, name: 'First contact', image: '/assets/images/1.jpg'},
      {id: 1, name: 'Second contact', image: '/assets/images/2.jpg'}
    ]);

    let items: DebugElement[];
    let fixture = createFixture(ContactsListComponent);

    // ContactsListComponent::ngOnInit() internally calls `ContactsService::getContacts()`
    expect(contactsService.getContacts).toHaveBeenCalled();

    // Get all <h3> for each row item
    items = queryFor(fixture, 'h3');
    expect(items.length).toEqual(2);
    items.forEach((item,j) => {
      expect(item).toHaveText(`${data[j].name}`)
    });

    // Get all <img> for each row item
    items = queryFor(fixture, 'img');
    items.forEach((item,j) => {
      expect(item).toHaveMap({
        src : `http://localhost:9876${data[j].image}`,  // url root is Karma context
        alt : `Picture of ${data[j].name}`
      });
    });

  });
});
