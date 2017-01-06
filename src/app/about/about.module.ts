import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';

import { AboutComponent } from './about.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AboutComponent }
    ]),
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
