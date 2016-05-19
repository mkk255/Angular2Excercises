import { ContactsListComponent } from './contacts-list';
import { ContactsDetailComponent } from './contacts-detail';

export const ContactsAppRoutes = [
  { path: '', component: ContactsListComponent },
  { path: 'contact/:id', component: ContactsDetailComponent }
];
