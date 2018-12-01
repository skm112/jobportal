import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import { JobPortalRoutingModule } from "./job-portal-routing.module";
import { JobPostComponent } from "./components/job-post/job-post.component";
import { BsDropdownModule, BsDatepickerModule } from "ngx-bootstrap";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgxEditorModule } from "ngx-editor";
import { CurrencyMaskModule } from "ngx-currency-mask";
import { HttpClientModule } from "@angular/common/http";
import { ShowJobComponent } from "./components/show-job/show-job.component";
import { ShowalljobsComponent } from "./components/showalljobs/showalljobs.component";
import { JobDetailsComponent } from "./components/job-details/job-details.component";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  imports: [
    CommonModule,
    JobPortalRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxEditorModule,
    CurrencyMaskModule,
    HttpClientModule,
    NgSelectModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    JobPostComponent,
    ShowJobComponent,
    ShowalljobsComponent,
    JobDetailsComponent
  ],
  providers: [DatePipe]
})
export class JobPortalModule {}
