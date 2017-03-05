import {Contact} from '../models/contact';
import {CONTACT_DATA} from './contact-data';
import {ContactManager} from './contact-manager';

describe('ContactsManager', () => {
  let contactManager: ContactManager;

  beforeEach(() => { contactManager = new ContactManager(CONTACT_DATA);  });
  afterEach(() =>  { contactManager = null;                              });

  describe('lookup APIs', () => {

    it('should return all contacts', () => {
      expect(contactManager.getAll()).toEqual(CONTACT_DATA);
    });

    it('should return a contact by id', () => {
      const CONTACT_ID = '1';
      let expectedContact = CONTACT_DATA.find((c:Contact) => c.id == CONTACT_ID);
      let contact = contactManager.findByID(CONTACT_ID);

      expect(contact).toEqual(expectedContact);
    });

    it('should return null when getting contact that doesn\'t exist', () => {
      const CONTACT_ID = 'NaN';
      expect(contactManager.findByID(CONTACT_ID)).toEqual(null);
    });
  });

  describe('mutator APIs', () => {

    it('should add new contact object', () => {
      let expectedContact : Contact = {
        id: '23',
        name: 'Another contact',
        email: 'another@contact.com',
        website: 'anothercontact.com'
      };

      contactManager.add(expectedContact);

      let contact = contactManager.getAll().find((c:Contact)  => c.id == expectedContact.id);
      expect(contact).toEqual(expectedContact);
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

      let contact = contactManager.findByID(expectedContact.id);
      expect(contact).toEqual(expectedContact);
    });
  });
});

