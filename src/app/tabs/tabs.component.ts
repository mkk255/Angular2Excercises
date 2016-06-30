import { Component, OnInit } from '@angular/core';
import { TabComponent } from './';

@Component({
  moduleId: module.id,
  selector: 'trm-tabs',
  templateUrl: 'tabs.component.html',
  styleUrls: ['tabs.component.css']
})
export class TabsComponent implements OnInit {

  private tabs: Array<TabComponent> = [];

  constructor() {}

  ngOnInit() {
  }

  addTab(tab: TabComponent) {
    if (this.tabs.length === 0) {
      this.select(tab);
    }
    this.tabs.push(tab);
  }

  select(tab: TabComponent) {
    this.tabs.forEach(tab => tab.selected = false);
    tab.selected = true;
  }
}
