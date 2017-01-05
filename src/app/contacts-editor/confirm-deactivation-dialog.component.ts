import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'trm-confirm-deactivation-dialog',
  template: `
    <h3 md-dialog-title>Are you sure?</h3>
    <div md-dialog-content>All unsaved changes will be gone.</div>

    <md-dialog-actions fxLayout fxLayoutAlign="center center">
      <button md-button (click)="dialogRef.close(true)">Yes</button>
      <button md-button md-dialog-close>No</button>
    </md-dialog-actions>
  `
})
export class ConfirmDeactivationDialogComponent {
  constructor(public dialogRef: MdDialogRef<ConfirmDeactivationDialogComponent>) {}
}
