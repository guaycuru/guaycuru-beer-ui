import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertListComponent } from './components/alert-list/alert-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ModalModule,
    BsDatepickerModule
  ],
  declarations: [
    AlertListComponent
  ],
  exports: [
    ModalModule,
    AlertListComponent
  ]
})
export class SharedModule { }
