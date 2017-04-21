import { contactsReducer, ContactsState } from './contacts/contacts.reducer';
import { Contact } from '../models/contact';

export interface ApplicationState {
  contacts: ContactsState;
}

export const ROOT_REDUCER = {
  contacts: contactsReducer
}