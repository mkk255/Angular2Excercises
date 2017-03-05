import {TestBed, inject, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Contact} from '../models/contact';

import {ContactsDetailViewComponent} from './contacts-detail-view.component';
import {ContactsService} from '../contacts.service';
import {EventBusService} from '../event-bus.service';
import {API_ENDPOINT} from '../app.tokens';

// ************************************************************************

/**
 * Router mock with a single stub method that will be used by `spyOn()`
 * Simulate ActivateRoute with a snapshot stub also.
 */
class RouterStub {
  navigate(urlSegments) {
  }
}
const activatedRouteStub = {
  snapshot: {
    params: {id: '0'},
  }
};

// ************************************************************************

describe('ContactsDetailViewComponent', () => {

  let expectedContact: Contact = {  id: '0',  name: 'Pascal Precht', email: 'foo@bar.com' };
  let createComponent = () => {
    let fixture = TestBed.createComponent(ContactsDetailViewComponent);
    let component = fixture.componentInstance;
    let contactsService = fixture.debugElement.injector.get(ContactsService);

    spyOn(contactsService, 'getContact').and.returnValue(Observable.of(expectedContact));

    return { fixture, component, contactsService };
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpModule],
      declarations: [ContactsDetailViewComponent],
      providers: [
        ContactsService, EventBusService,
        {provide: ActivatedRoute, useValue: activatedRouteStub},
        {provide: Router, useClass: RouterStub},
        {provide: API_ENDPOINT, useValue: 'http://localhost:4201'}
      ],
    });

  });

  it('should fetch contact by given route param', () => {
    let { fixture, component, contactsService } = createComponent();

    fixture.detectChanges();

    expect(contactsService.getContact).toHaveBeenCalled();
    expect(contactsService.getContact).toHaveBeenCalledWith('0');
    expect(component.contact).toEqual(expectedContact);
  });

  it('should emit appTitleChange event with contact name', inject([EventBusService], (eventBusService) => {
    spyOn(eventBusService, 'emit');

    let { fixture } = createComponent();
    fixture.detectChanges();

    expect(eventBusService.emit).toHaveBeenCalledWith('appTitleChange', expectedContact.name);
  }));

  describe('Router navigation', ()=>{

    it('should navigate to list', inject([Router], (router) => {
      let { component } = createComponent();
      spyOn(router, 'navigate');

      component.navigateToList();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    }));

    it('should navigate to editor route with correct params', inject([Router], (router) => {
      let { component } = createComponent();
      spyOn(router, 'navigate');

      component.navigateToEditor(expectedContact);
      expect(router.navigate).toHaveBeenCalledWith(['/contact', expectedContact.id, 'edit']);
    }));

    xit('should navigate to list (test location path)', fakeAsync(inject([Router, Location], (router, location) => {
      let { component } = createComponent();
      spyOn(router, 'navigate');

      component.navigateToList();
      expect(router.navigate).toHaveBeenCalledWith(['/']);

      tick();   // flush router async queue
      expect(location.path()).toEqual('/');
    })));

    xit('should navigate to editor route with correct params (test location path)', fakeAsync(inject([Router, Location], (router, location) => {
      let { component } = createComponent();
      spyOn(router, 'navigate');

      component.navigateToEditor(expectedContact);
      expect(router.navigate).toHaveBeenCalledWith(['/contact', expectedContact.id, 'edit']);

      tick();   // flush router async queue
      expect(location.path()).toEqual('/contact/0/edit');
    })));
  });

});
