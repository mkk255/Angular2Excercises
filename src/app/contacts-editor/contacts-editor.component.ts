import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { EventBusService } from '../event-bus.service';

import { validateEmail } from '../email-validator.directive';
import { checkEmailAvailability } from '../email-availability-validator.directive';

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  contact: Contact;
  form: FormGroup;
  warnOnClosing = true;
  modelHasChanged = false;
  notifyContactUpdated = false;

  constructor(private contactsService: ContactsService,
              private eventBusService: EventBusService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', validateEmail],
      phone: '',
      birthday: '',
      website: '',
      address: this.formBuilder.group({
        street: '',
        zip: '',
        city: '',
        country: ''
      })
    });

    this.route.data
        .map(data => data['contact'])
        .subscribe(contact => {
          this.contact = contact;
          // We need to add the async validator when the contact is loaded,
          // because it needs the contact's email address.
          this.form.get('email').setAsyncValidators(checkEmailAvailability(this.contactsService, this.contact.email));
          this.form.patchValue(contact);

          this.eventBusService.emit('appTitleChange', `Editing: ${contact.name}`);
        });

    this.form.valueChanges.subscribe((value) => {
      this.modelHasChanged = true;
      // We currently render `contact.name` in contacts-list.
      // To make this change visible we need to notify the component.
      this.notifyContactUpdated = value.name !== this.contact.name;
    });
  }

  cancel() {
    this.goToDetails();
  }

  save(contact: Contact) {
    this.warnOnClosing = false;
    // We're mutating the origin `contact` object with the changes introduced
    // via form interactions. This is because the object reference isn't automatically
    // updated via `FormControl`s.
    Object.assign(this.contact, contact)
    this.contactsService
        .updateContact(this.contact)
        .subscribe(() => {
          if (this.notifyContactUpdated) {
            this.eventBusService.emit('contactUpdated', null);
          }
          this.goToDetails();
        });
  }

  private goToDetails() {
    this.router.navigate(['/contact', this.contact.id ]);
  }
}

