import { Routes } from '@angular/router';
import { ContactsDetailViewComponent } from './contacts-detail-view/contacts-detail-view.component';
import { ContactsEditorComponent } from './contacts-editor/contacts-editor.component';
import { ContactsDashboardComponent } from './contacts-dashboard/contacts-dashboard.component';
import { CanDeactivateContactsEditorGuard } from './contacts-editor/can-deactivate-contacts-editor.guard';
import { ContactResolver } from './shared/contact.resolver';
import { ContactsCreatorComponent } from './contacts-creator/contacts-creator.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: ContactsDashboardComponent,
    children: [
      { path: '', redirectTo: 'contact/0', pathMatch:'full' },
      // We have to put this route above the contact detail route
      // so it's matched before `contact/:id`, which `contact/new`
      // would be.
      { path: 'contact/new', component: ContactsCreatorComponent },
      {
        path: 'contact/:id',
        component: ContactsDetailViewComponent,
        resolve: {
          contact: ContactResolver
        }
      },
      {
        path: 'contact/:id/edit',
        component: ContactsEditorComponent,
        canDeactivate: [CanDeactivateContactsEditorGuard],
        resolve: {
          contact: ContactResolver
        }
      }
    ]
  },
  { path: 'about', loadChildren: './about/about.module#AboutModule' },
  // Wildcard route serves as fallback route and has to be
  // the last defined route in this list.
  { path: '**', redirectTo: '/' }
];

