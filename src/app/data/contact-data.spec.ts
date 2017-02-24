import { Component } from '@angular/core';

import { Contact } from '../models/contact';
import { CONTACT_DATA } from './contact-data';

class ContactManager {

  contacts: Array<Contact> = [];

  constructor(data: Array<Contact>) {
    this.contacts = [...data];
  }

  add(contact: Contact) {
    this.contacts.push(contact);
  }

  update(contact: Contact) {
    let index = this.contacts.findIndex(c => c.id == contact.id);
    if (index === -1) {
      throw new Error(`Trying to update contact that doesn't exist with ID: ${contact.id}!`);
    }
    this.contacts[index] = contact;
  }

  get(id: string) {
    let contact = this.contacts.find(c => c.id == id);
    return contact ? contact : null;
  }

  getAll() {
    return [...this.contacts];
  }
}

describe('ContactsManager', () => {

  let contactManager: ContactManager = null;

  beforeEach(() => {
    contactManager = new ContactManager(CONTACT_DATA);
  });

  afterEach(() => {
    contactManager = null;
  });

  describe('lookup APIs', () => {

    it('should return all contacts', () => {
      expect(contactManager.getAll()).toEqual(CONTACT_DATA);
    });

    it('should return a contact by id', () => {
      const CONTACT_ID = '1';
      let expectedContact = CONTACT_DATA.find(c => c.id == CONTACT_ID);

      expect(contactManager.get(CONTACT_ID)).toEqual(expectedContact);
    });

    it('should return null when getting contact that doesn\'t exist', () => {
      const CONTACT_ID = 'NaN';

      expect(contactManager.get(CONTACT_ID)).toEqual(null);
    });
  });

  describe('mutator APIs', () => {

    it('should add new contact object', () => {

      let expectedContact = {
        id: '23',
        name: 'Another contact',
        email: 'another@contact.com',
        website: 'anothercontact.com'
      };

      contactManager.add(expectedContact);

      let addedContact = contactManager.contacts.find(c => c.id == expectedContact.id);

      expect(addedContact).toEqual(expectedContact);
    });

    it('should throw when trying to update contact that doesn\'t exist', () => {
      const CONTACT_ID = 'foo';
      let contact = {
        id: CONTACT_ID,
        name: 'who am I'
      };

      expect(() => {
        contactManager.update(contact)
      }).toThrowError(`Trying to update contact that doesn't exist with ID: ${CONTACT_ID}!`);
    });

    it('should update an existing contact', () => {

      const CONTACT_ID = '2';
      let expectedContact = {
        id: CONTACT_ID,
        name: 'Updated contact'
      };

      contactManager.update(expectedContact);
      let contact = contactManager.contacts.find(c => c.id == CONTACT_ID);
      expect(contact).toEqual(expectedContact);
    });
  });
});

