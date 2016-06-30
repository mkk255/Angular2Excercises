import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'trm-tab',
  templateUrl: 'tab.component.html',
  styleUrls: ['tab.component.css']
})
export class TabComponent {
  @Input() title = '';
  @Input() selected = false;
}

