import { Contact } from '../../models/contact';

import { ContactsActionTypes, ContactsActions } from '../contacts/contacts.actions';

export interface ContactsState {
  list: Array<Contact>;
  selectedContactId: number | null;
}

const INITAL_STATE: ContactsState = {
  list: [],
  selectedContactId: null
}

export function contactsReducer(state: ContactsState = INITAL_STATE, action: ContactsActions) {
  switch (action.type) {
    case ContactsActionTypes.LOAD_CONTACTS_SUCCESS:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
}