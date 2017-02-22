import { TestBed, ComponentFixture } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

import { ContactsListComponent } from './contacts-list.component';
import { ContactsService } from '../contacts.service';
import { EventBusService } from '../event-bus.service';
import { API_ENDPOINT } from '../app.tokens';

describe('ContactsListComponent', () => {

  let fixture: ComponentFixture<ContactsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsListComponent],
      providers: [
        ContactsService,
        EventBusService,
        { provide: API_ENDPOINT, useValue: 'http://localhost:4201/api' }
      ],
      imports: [
        MaterialModule,
        HttpModule,
        RouterTestingModule
      ]
    });

    fixture = TestBed.createComponent(ContactsListComponent);
  });

  it('should fetch and display contacts', () => {
    let contactsService = fixture.debugElement.injector.get(ContactsService);

    spyOn(contactsService, 'getContacts').and.returnValue(Observable.of([
      { id: 0, name: 'First contact', image: '/assets/images/1.jpg' }
      { id: 1, name: 'Second contact', image: '/assets/images/2.jpg' }
    ]));

    fixture.detectChanges();

    let viewItems = fixture.debugElement.queryAll(By.css('h3'));

    expect(contactsService.getContacts).toHaveBeenCalled();
    expect(viewItems.length).toEqual(2);
    expect(viewItems[0].nativeElement.textContent).toEqual('First contact');
    expect(viewItems[1].nativeElement.textContent).toEqual('Second contact');
  });
});
