import { Contact } from '../models/contact';

export class ContactManager {

  private contacts: Array<Contact> = [];

  constructor(data: Array<Contact>) {
    this.contacts = [...data];
  }

  add(contact: Contact):ContactManager {
    this.contacts.push(contact);
    return this;
  }

  update(contact: Contact):ContactManager {
    let index = this.contacts.findIndex((c:Contact)  => c.id == contact.id);
    if (index === -1) {
      throw new Error(`Trying to update contact that doesn't exist with ID: ${contact.id}!`);
    }
    this.contacts[index] = contact;
    return this;
  }

  findByID(id: string):Contact {
    let contact = this.contacts.find((c:Contact) => c.id == id);
    return contact ? contact : null;
  }

  getAll(): Contact[] {
    return [...this.contacts];
  }

}
