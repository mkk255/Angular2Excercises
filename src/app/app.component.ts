import { Component } from '@angular/core';

@Component({
  selector: 'trm-contacts-app',
  template: `
    <md-toolbar color="primary">Contacts</md-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class ContactsAppComponent {}
