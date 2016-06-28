import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { ContactsService } from './contacts.service';

describe('Contacts Service', () => {
  beforeEachProviders(() => [ContactsService]);

  it('should ...',
      inject([ContactsService], (service: ContactsService) => {
    expect(service).toBeTruthy();
  }));
});
