import { Routes } from '@angular/router';
import { ContactsDetailViewComponent } from './contacts-detail-view/contacts-detail-view.component';
import { ContactsEditorComponent } from './contacts-editor/contacts-editor.component';
import { ContactsDashboardComponent } from './contacts-dashboard/contacts-dashboard.component';
import { AboutComponent } from './about/about.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: ContactsDashboardComponent,
    children: [
      { path: '', redirectTo: 'contact/0', pathMatch:'full' },
      { path: 'contact/:id', component: ContactsDetailViewComponent },
      {
        path: 'contact/:id/edit',
        component: ContactsEditorComponent,
        canDeactivate: ['ConfirmNavigationGuard']
      }
    ]
  },
  { path: 'about', component: AboutComponent },
  // Wildcard route serves as fallback route and has to be
  // the last defined route in this list.
  { path: '**', redirectTo: '/' }
];

