import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ContactsDetailComponent } from './contacts-detail.component';
import { Contact } from '../models/contact';

describe('ContactsDetailComponent', () => {

  let fixture: ComponentFixture<ContactsDetailComponent>;
  let component: ContactsDetailComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsDetailComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(ContactsDetailComponent);
    component = fixture.componentInstance;
  });

  it('should render contact', () => {

    let expectedContact: Contact = {
      id: 0,
      image: '/assets/images/1.jpg',
      name: 'Expected Contact',
      email: 'expected@contact.com',
      address: {
        street: '',
        zip:'',
        city: ''
      }
    };

    let debugEl = fixture.debugElement.query(By.css('md-card-title'));

    component.contact = expectedContact;
    fixture.detectChanges();
    expect(debugEl.nativeElement.textContent).toContain(expectedContact.name);

    expectedContact.name = 'Other Name';
    fixture.detectChanges();
    expect(debugEl.nativeElement.textContent).toContain(expectedContact.name);
  });

  it('should emit back event', () => {

    let backEmitted = false;
    let buttonEl = fixture.debugElement.queryAll(By.css('[md-button]'))[1];

    component.back.subscribe(() => {
      backEmitted = true;
    });

    buttonEl.triggerEventHandler('click', null);
    expect(backEmitted).toBe(true);
  });

  it('should emit edit event', () => {

    let expectedContact: Contact = {
      id: 0,
      image: '/assets/images/1.jpg',
      name: 'Expected Contact',
      email: 'expected@contact.com',
      address: {
        street: '',
        zip:'',
        city: ''
      }
    };
    let contact: Contact = null;
    let buttonEl = fixture.debugElement.queryAll(By.css('[md-button]'))[0];

    component.contact = expectedContact;

    component.edit.subscribe((c) => {
      contact = c;
    });

    buttonEl.triggerEventHandler('click', null);
    expect(contact).toBe(expectedContact);
  });
});
