import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { EducationComponent } from "./education/education.component";
import { EducationalDetailsComponent } from "./educational-details/educational-details.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ApplyforjobComponent } from "./applyforjob/applyforjob.component";
import { ShowappliedjobsComponent } from "./showappliedjobs/showappliedjobs.component";


const routes: Routes = [
  {
    path: "",
    data: {
      title: "User"
    },
    children: [
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "resetpass",
        component: ResetPasswordComponent
      },
      {
        path: "addeducation/:username",
        component: EducationComponent
      },
      {
        path: "showeducation",
        component: EducationalDetailsComponent
      },
      {
        path: "applyforjob",
        component: ApplyforjobComponent
      },
      {
        path: "applyforjob/:id",
        component: ApplyforjobComponent
      },
      {
        path: "showappliedjobs",
        component: ShowappliedjobsComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
