import { Component, OnInit } from '@angular/core';
import { EventBusService } from './event-bus.service';


@Component({
  selector: 'trm-contacts-app',
  template: `
    <md-toolbar color="primary">
      <div fxLayout fxLayoutAlign="space-between center" fxFlex>
        {{title}}
        <a md-button title="Go to about page" routerLink="/about" class="right">About</a>
      </div>
    </md-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./contacts.component.scss']
})
export class ContactsAppComponent implements OnInit {

  title: string;

  constructor(private eventBusService: EventBusService) {}

  ngOnInit () {
    this.eventBusService.observe('appTitleChange')
                        .subscribe(title => this.title = title);
  }
}
