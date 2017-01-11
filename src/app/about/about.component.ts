import { Component } from '@angular/core';
import { EventBusService } from '../event-bus.service';

@Component({
  selector: 'trm-about',
  template: `
    <div class="trm-about">
      <md-card fxLayout="column" fxFlex fxLayoutAlign="center center">
        <h2 md-card-title>Angular Master Class</h2>
        <md-card-content>
          <img src="/assets/images/team.jpg" alt="Team thoughtram">
          <p style="text-align: center;">Brought to you by thoughtram</p>
        </md-card-content>
        <md-card-actions>
          <a md-button title="Go back to Dashboard" routerLink="/">Go Back</a>
        </md-card-actions>
      </md-card>
    </div>
  `,
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(private eventBusService: EventBusService) {}

  ngOnInit() {
    this.eventBusService.emit('appTitleChange', 'About');
  }
}
