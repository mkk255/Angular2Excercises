import { Component } from '@angular/core';
import { ContactsHeaderComponent } from './contacts-header';

@Component({
  moduleId: module.id,
  selector: 'trm-contacts-app',
  templateUrl: 'contacts.component.html',
  styleUrls: ['contacts.component.css'],
  directives: [ContactsHeaderComponent]
})
export class ContactsAppComponent {

}
