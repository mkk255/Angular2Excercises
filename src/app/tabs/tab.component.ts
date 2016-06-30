import { Component, OnInit, Optional, Input } from '@angular/core';
import { TabsComponent } from './';

@Component({
  moduleId: module.id,
  selector: 'trm-tab',
  templateUrl: 'tab.component.html',
  styleUrls: ['tab.component.css']
})
export class TabComponent implements OnInit {

  @Input() title = '';
  @Input() selected = false;

  constructor(private tabsComponent: TabsComponent) {}

  ngOnInit() {
    this.tabsComponent.addTab(this);
  }

}

