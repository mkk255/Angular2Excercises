import { Component } from '@angular/core';

@Component({
  selector: 'trm-contacts-dashboard',
  template: `
    <md-sidenav-container>
      <md-sidenav mode="side" opened="true">
        <trm-contacts-list></trm-contacts-list>
      </md-sidenav>
      <div class="main-content">
        <router-outlet></router-outlet>
      </div>
    </md-sidenav-container>
  `,
  styleUrls: ['./contacts-dashboard.component.css']
})
export class ContactsDashboardComponent {}
