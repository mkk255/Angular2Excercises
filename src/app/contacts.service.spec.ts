import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { API_ENDPOINT } from './app.tokens';
import { ContactsService } from './contacts.service';

/**
 * !! Developers should run `npm run rest-api` to ensure the app server is available
 * for these live RESTful service calls.
 */
describe('ContactsService', () => {
  let contactsService: ContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContactsService,
        { provide: API_ENDPOINT, useValue: 'http://localhost:4201/api' }
      ],
      imports: [HttpModule]
    });
  });

  beforeEach( inject( [ContactsService], (service) => {
    contactsService = service;
  }));

  describe('getContacts() with live RESTFul services', () => {

    /**
     * Note `async()` required for live RESTful service calls
     */
    it('should fetch and emit contacts list', async(() => {
      contactsService.getContacts().subscribe(contacts => {
        expect(contacts.length).toEqual(11);
        expect(contacts[0].name).toEqual('Christoph Burgdorf');
        expect(contacts[1].name).toEqual('Pascal Precht');
        expect(contacts[2].name).toEqual('Nicole Hansen');
      });
    }));
  });

    it('should fetch and emit single contact by given id', async(() => {
      contactsService.getContact('0').subscribe(contact => {
        expect(contact).toBeDefined();
        expect(contact.id).toEqual(0);
        expect(contact.name).toEqual('Christoph Burgdorf');
      });
    }));
  });

});
