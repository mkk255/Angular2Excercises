import { Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  moduleId: module.id,
  selector: 'trm-tabs',
  templateUrl: 'tabs.component.html',
  styleUrls: ['tabs.component.css']
})
export class TabsComponent {

  private _tabs: Array<TabComponent> = [];

  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;

  addTab(tab: TabComponent) {
    if (this._tabs.length === 0) {
      this.select(tab);
    }
    this._tabs.push(tab);
  }

  select(tab: TabComponent) {
    this._tabs.forEach(tab => tab.selected = false);
    tab.selected = true;
  }

  ngAfterContentInit() {
    this.tabs.toArray().forEach(tab => this.addTab(tab));
  }
}
