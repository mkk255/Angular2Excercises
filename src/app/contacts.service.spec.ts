import { TestBed, inject, async } from '@angular/core/testing';

import { Inject } from '@angular/core';
import { HttpModule, XHRBackend, RequestMethod, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ContactsService } from './contacts.service';
import { API_ENDPOINT } from './app.tokens';

describe('ContactsService', () => {


  xdescribe('using real backend', () => {

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

    beforeEach(inject([ContactsService], (service) => {
      contactsService = service;
    }));

    describe('getContacts()', () => {

      it('should fetch and emit contacts list', async(() => {
        contactsService.getContacts().subscribe(contacts => {
          expect(contacts.length).toEqual(11);
          expect(contacts[0].name).toEqual('Christoph Burgdorf');
          expect(contacts[1].name).toEqual('Pascal Precht');
          expect(contacts[2].name).toEqual('Nicole Hansen');
        });
      }));
    });

    describe('getContact()', () => {

      it('should fetch and emit single contact by given id', async(() => {
        contactsService.getContact('0').subscribe(contact => {
          expect(contact).toBeDefined();
          expect(contact.id).toEqual(0);
          expect(contact.name).toEqual('Christoph Burgdorf');
        });
      }));
    });
  });

  describe('using fake backend', () => {

    let contactsService: ContactsService;
    let backend: XHRBackend;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ContactsService,
          { provide: API_ENDPOINT, useValue: 'http://localhost:4201/api' },
          { provide: XHRBackend, useClass: MockBackend }
        ]
        imports: [HttpModule]
      });
    });

    beforeEach(inject([ContactsService, XHRBackend], (service, mockBackend) => {
      contactsService = service;
      backend = mockBackend;
    }));

    describe('getContacts()', () => {

      it('should fetch and emit contacts array', () => {

        let mockResponse = {
          items: [
            { id: 0, name: 'First contact' },
            { id: 1, name: 'Second contact' },
            { id: 2, name: 'Third contact' }
          ]
        };

        backend.connections.subscribe(connection => {
          connection.mockRespond(new Response({ body: JSON.stringify(mockResponse) }));
        });

        contactsService.getContacts().subscribe(contacts => {
          expect(contacts.length).toEqual(3);
          expect(contacts[0].name).toEqual('First contact');
          expect(contacts[1].name).toEqual('Second contact');
          expect(contacts[2].name).toEqual('Third contact');
        });
      });
    });

    describe('getContact()', () => {

      it('should fetch and emit single contact by given id', () => {
        let mockResponse = {
          item: { id: 0, name: 'First contact' }
        };

        backend.connections.subscribe(connection => {
          connection.mockRespond(new Response({ body: JSON.stringify(mockResponse) }));
        });

        contactsService.getContact('0').subscribe(contact => {
          expect(contact).toBeDefined();
          expect(contact.id).toEqual(0);
          expect(contact.name).toEqual('First contact');
        });
      });
    });

    describe('updateContact()', () => {

      it('should update existing contact', () => {
        let mockResponse = {
          item: { id: 0, name: 'Other name' }
        };

        backend.connections.subscribe(connection => {
          // As we're in full control over what MockBackend returns, the only
          // thing we're really interested in is if a correct request, with the
          // correct payload is made.
          expect(connection.request.url).toBe('http://localhost:4201/api/contacts/0');
          expect(connection.request.method).toBe(RequestMethod.Put);
          expect(JSON.parse(connection.request.getBody())).toEqual(mockResponse.item);
          connection.mockRespond(new Response({ body: JSON.stringify(mockResponse) }));
        });

        contactsService.updateContact(mockResponse.item).subscribe();
      });
    });
  });
});

