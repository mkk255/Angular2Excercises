import { Action } from '@ngrx/store';
import { Contact } from '../../models/contact';

/**
 * We use const here to define action types to allow for string type coercion
 * The namespace is used to group all action types for easier and maintainable 
 * imports
 * 
 * The type inferred for a const variable or readonly property without a type 
 * annotation is the type of the initializer as-is. This means that the type
 * of a const will match its value. By using an object or define the action
 * type using `let` the type will be string. The type information is helpful
 * to infer the type of the action payload in the reducer. It is also 
 * required to mark the type property as `readonly` on the action class.
 */
export namespace ContactsActionTypes {
  export const LOAD_CONTACTS_SUCCESS = '[Contacts] Load Contacts Success';
}

export class LoadContactsSuccessAction implements Action {
  readonly type = ContactsActionTypes.LOAD_CONTACTS_SUCCESS;

  constructor(public payload: Array<Contact>) { }
}

export type ContactsActions = LoadContactsSuccessAction;