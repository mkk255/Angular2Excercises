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

describe('ContactsListComponent', () => {
  let contactsService: ContactsService;
  let interceptAPI;

  beforeEach(() => {
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

  it('should fetch and display contacts', () => {
    interceptAPI('getContacts').respondWith([
      {id: 0, name: 'First contact', image: '/assets/images/1.jpg'},
      {id: 1, name: 'Second contact', image: '/assets/images/2.jpg'}
    ]);

    let fixture = createFixture(ContactsListComponent);
    let items: DebugElement[] = queryFor(fixture, 'h3');

    expect(contactsService.getContacts).toHaveBeenCalled();
    expect(items.length).toEqual(2);

    // These will fail, use DevTools to debug and find out why
    expect(items[0].textContent).toEqual('First contact');
    expect(items[1].textContent).toEqual('Second contact');
  });
});
