import {Component} from '@angular/core';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';

import {Contact} from '../models/contact';
import {ContactsDetailComponent} from './contacts-detail.component';
import {Subscription} from 'rxjs';

describe('ContactsDetailComponent', () => {

  describe('direct testing', ()=>{
    let fixture: ComponentFixture<ContactsDetailComponent>;
    let component: ContactsDetailComponent;
    let subscription : Subscription;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports : [MaterialModule],
        declarations: [ContactsDetailComponent],
      });

      fixture = TestBed.createComponent(ContactsDetailComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;
    });
    afterEach(() => {
      if ( subscription ) {
        subscription.unsubscribe();
      }
      subscription = component = fixture = null;
    });

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

  describe('in-direct testing', ()=> {
    /**
     * Build instance of the test component with a specific HTML template
     */
    function createTestComponent(
      template: string,
      styles?: any): ComponentFixture<TestContactDetailsComponent> {
        return TestBed.overrideComponent(TestContactDetailsComponent, {
          set : {
            template : template,
            styles : styles || []
          }
        }).createComponent(TestContactDetailsComponent);
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports : [MaterialModule],
        declarations: [TestContactDetailsComponent, ContactsDetailComponent]
      });
    });

    it('should detect edit request with contact information', () => {
      const EDIT_BUTTON = 0;
      const fixture = createTestComponent(`
        <trm-contacts-detail [contact]="employee" (edit)="editContact($event)">
        </trm-contacts-detail>
      `);
      const instance = fixture.componentInstance;

      instance.employee = buildContact();
      fixture.detectChanges();

      let buttonEl = fixture.debugElement.queryAll(By.css('[md-button]'))[EDIT_BUTTON];
      buttonEl.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(instance.requestedEdit).toBeDefined();
      expect(instance.requestedEdit.id).toEqual(instance.employee.id);
    });
  });

});

/**
 * Internal Test component that uses the `trm-contacts-detail` selector
 */
@Component({
  selector: 'test-contact-details',
  template: `REPLACE IN it()`
})
export class TestContactDetailsComponent {
  employee : Contact;
  requestedEdit : Contact;

  editContact(who:Contact) {
    this.requestedEdit = who;
  }
}


/**
 * Contact builder utility
 */
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

