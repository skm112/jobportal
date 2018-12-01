import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { EducationComponent } from './education/education.component';
import { EducationalDetailsComponent } from './educational-details/educational-details.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ApplyforjobComponent } from './applyforjob/applyforjob.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxEditorModule } from 'ngx-editor';
import { NgxCurrencyModule } from "ngx-currency";
import { ShowappliedjobsComponent } from './showappliedjobs/showappliedjobs.component';
import { AlertModule } from 'ngx-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule, FormsModule, ReactiveFormsModule, TypeaheadModule, BsDatepickerModule, NgxEditorModule, NgxCurrencyModule, AlertModule.forRoot()
  ],
  declarations: [ProfileComponent, EducationComponent, EducationalDetailsComponent, ResetPasswordComponent, ApplyforjobComponent, ShowappliedjobsComponent],
  providers: [DatePipe,]
})
export class UserModule { }
