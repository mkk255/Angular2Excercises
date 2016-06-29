import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ContactsEditorComponent } from './contacts-editor.component';

describe('Component: ContactsEditor', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ContactsEditorComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ContactsEditorComponent],
      (component: ContactsEditorComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ContactsEditorComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ContactsEditorComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <trm-contacts-editor></trm-contacts-editor>
  `,
  directives: [ContactsEditorComponent]
})
class ContactsEditorComponentTestController {
}

