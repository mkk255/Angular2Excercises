import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {Contact} from '../models/contact';
import {ContactsDetailComponent} from './contacts-detail.component';
import {Subscription} from 'rxjs';

describe('ContactsDetailComponent', () => {

  let fixture: ComponentFixture<ContactsDetailComponent>;
  let component: ContactsDetailComponent;
  let subscription: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsDetailComponent],
      // Use this because we are not loading the Material components
      // and not running the mdCard nor the mdInput Directive(s)
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(ContactsDetailComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });
  afterEach(() => {
    if (subscription) {
      subscription.unsubscribe();
    }
    subscription = component = fixture = null;
  })

  it('should render contact', () => {
    let expectedContact = buildContact();
    let cardTitle = fixture.debugElement.query(By.css('md-card-title')).nativeElement;
    let imgUrl = fixture.debugElement.queryAll(By.css('img'))[0].nativeElement;
    let inputName = fixture.debugElement.queryAll(By.css('[mdInput]'))[0].nativeElement;

    component.contact = expectedContact;
    fixture.detectChanges();

    expect(imgUrl.src).toContain(expectedContact.image);
    expect(cardTitle.textContent).toContain(expectedContact.name);
    expect(inputName.value).toEqual(expectedContact.name);

    expectedContact.name = 'Other Name';
    fixture.detectChanges();
    expect(cardTitle.textContent).toContain(expectedContact.name);
  });

  it('should emit back event', () => {
    let backEmitted = false;
    let buttonEl = fixture.debugElement.queryAll(By.css('[md-button]'))[1];

    subscription = component.back.subscribe(() => {
      backEmitted = true;
    });

    buttonEl.triggerEventHandler('click', null);
    expect(backEmitted).toBe(true);
  });

  it('should emit edit event', () => {
    let contact: Contact = null;
    let expectedContact: Contact = buildContact();
    let buttonEl = fixture.debugElement.queryAll(By.css('[md-button]'))[0];

    component.contact = expectedContact;
    component.edit.subscribe((c) => {
      contact = c;
    });
    fixture.detectChanges();

    buttonEl.triggerEventHandler('click', null);
    expect(contact).toBe(expectedContact);
  });
});

/** Contact builder utility */
function buildContact(id = 0, name = 'Expected Contact', email = 'expected@contact.com'): Contact {
  return {
    id: id,
    name: name,
    email: email,
    image: '/assets/images/1.jpg',
    address: {
      street: '',
      zip: '',
      city: ''
    }
  };
}

