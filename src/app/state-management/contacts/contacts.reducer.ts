import { createSelector } from 'reselect';

import { Contact } from '../../models/contact';

import { ContactsActionTypes, ContactsActions } from '../contacts/contacts.actions';

import { ApplicationState } from "../index";

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
    case ContactsActionTypes.ADD_CONTACT:
      let findInList = (found, contact) => found || contact.id == action.payload.id;
      let inStore = state.list.reduce(findInList, false);

      return {
        ...state,
        list: !inStore ? [...state.list, action.payload] : [...state.list]
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

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level.
 *
 *   Remember to keep your selectors small and focused so they can be combined
 *   and composed to fit each particular use-case.
 *
 * Why Query(s)?
 * If store is analogous to a database and reducers the tables, then selectors can
 * be considered the queries into said database.
 */

export namespace ContactsQuery {
  export const getContacts = (state: ApplicationState) => state.contacts.list;
  export const getLoaded = (state: ApplicationState) => state.contacts.loaded;
  export const getSelectedContactId = (state: ApplicationState) => state.contacts.selectedContactId;

  export const getSelectedContact = createSelector(getContacts, getSelectedContactId, (contacts, id) => {
    let contact = contacts.find(contact => contact.id == id);

    return contact ? Object.assign({}, contact) : undefined;
  });
}