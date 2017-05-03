import { Contact } from '../../models/contact';

import { ContactsActionTypes, ContactsActions } from '../contacts/contacts.actions';

export interface ContactsState {
  list: Array<Contact>;
  selectedContactId: number | null;
  loaded: boolean;
}

const INITAL_STATE: ContactsState = {
  list: [],
  selectedContactId: null,
  loaded: false
}

export function contactsReducer(state: ContactsState = INITAL_STATE, action: ContactsActions) {
  switch (action.type) {
    case ContactsActionTypes.LOAD_CONTACTS_SUCCESS:
      return {
        ...state,
        loaded: true,
        list: action.payload
      };
    case ContactsActionTypes.SELECT_CONTACT:
      return {
        ...state,
        selectedContactId: action.payload
      }
    case ContactsActionTypes.UPDATE_CONTACT:
      let updatedList = state.list.map(contact => contact.id == action.payload.id
        ? { ...contact, ...action.payload } : contact);

      return {
        ...state,
        list: updatedList
      }
    default:
      return state;
  }
}
