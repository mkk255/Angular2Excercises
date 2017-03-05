import {TestBed, inject, async} from '@angular/core/testing';

import {HttpModule, XHRBackend, RequestMethod, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

import {API_ENDPOINT} from './app.tokens';
import {ContactsService} from './contacts.service';

xdescribe('ContactsService with live RESTful services', () => {
  let contactsService: ContactsService;

  /**
   * !! Developers should run `npm run rest-api` to ensure the app server is available
   * for these live RESTful service calls.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContactsService,
        {provide: API_ENDPOINT, useValue: 'http://localhost:4201/api'}
      ],
      imports: [HttpModule]
    });
  });
  beforeEach(inject([ContactsService], (service) => {
    contactsService = service;
  }));

  describe('for contact lookups', () => {

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

    it('should fetch and emit single contact by given id', async(() => {
      contactsService.getContact('0').subscribe(contact => {
        expect(contact).toBeDefined();
        expect(contact.id).toEqual(0);
        expect(contact.name).toEqual('Christoph Burgdorf');
      });
    }));

  });

});

describe('ContactsService using Mock HTTP services', () => {
  let contactsService: ContactsService;
  let backend: XHRBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ContactsService,
        {provide: API_ENDPOINT, useValue: 'http://localhost:4201/api'},
        {provide: XHRBackend, useClass: MockBackend}
      ]
    });
  });
  beforeEach(inject([ContactsService, XHRBackend], (service, mockBackend) => {
    contactsService = service;
    backend = mockBackend;
  }));

  describe('for contact lookups', () => {

    it('should fetch and emit contacts list', async(() => {
      let mockResponse = {
        items: [
          {id: 0, name: 'First contact'},
          {id: 1, name: 'Second contact'},
          {id: 2, name: 'Third contact'}
        ]
      };
      backend.connections.subscribe(connection => {
        connection.mockRespond( new Response( new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      contactsService.getContacts().subscribe(contacts => {
        expect(contacts.length).toEqual(3);
        expect(contacts[0].name).toEqual('First contact');
        expect(contacts[1].name).toEqual('Second contact');
        expect(contacts[2].name).toEqual('Third contact');
      });
    }));

    it('should fetch and emit single contact by given id', async(() => {
      backend.connections.subscribe(connection => {
        connection.mockRespond( new Response( new ResponseOptions({
            body: JSON.stringify({
              item: {id: 0, name: 'First contact'}
            })
        })));
      });

      contactsService.getContact('0').subscribe(contact => {
        expect(contact).toBeDefined();
        expect(contact.id).toEqual(0);
        expect(contact.name).toEqual('First contact');
      });
    }));
  });

  describe('for contact modifications', () => {

    it('should update existing contact', () => {
      let mockResponse = {
        item: {id: 0, name: 'Other name'}
      };

      // As we're in full control over what MockBackend returns, the only
      // thing we're really interested in is if a correct request, with the
      // correct payload is made.
      backend.connections.subscribe(connection => {
        expect(connection.request.url).toBe('http://localhost:4201/api/contacts/0');
        expect(connection.request.method).toBe(RequestMethod.Put);
        expect(JSON.parse(connection.request.getBody())).toEqual(mockResponse.item);

        connection.mockRespond( new Response( new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      let subscription = contactsService.updateContact(mockResponse.item).subscribe();
      subscription.unsubscribe();
    });
  });

});
