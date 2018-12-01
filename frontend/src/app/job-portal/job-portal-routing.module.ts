import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { JobPostComponent } from "./components/job-post/job-post.component";
import { ShowJobComponent } from "./components/show-job/show-job.component";
import { ShowalljobsComponent } from "./components/showalljobs/showalljobs.component";
import { JobDetailsComponent } from "./components/job-details/job-details.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "jobportal"
    },
    children: [
      {
        path: "jobpost",
        component: JobPostComponent,
        data: {
          title: "JobPost"
        }
      },
      {
        path: "showjob",
        component: ShowJobComponent,
        data: {
          title: "ShowJob"
        }
      },
      {
        path: "showjob/:username",
        component: ShowJobComponent,
        data: {
          title: "ShowJob"
        }
      },
      {
        path: "showalljobs",
        component: ShowalljobsComponent,
        data: {
          title: "ShowAllJobs"
        }
      },
      {
        path: "jobdetails",
        component: JobDetailsComponent,
        data: {
          title: "JobDetails"
        }
      },
      {
        path: "jobdetails/:id/:Jobtitle",
        component: JobDetailsComponent,
        data: {
          title: "JobDetails"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobPortalRoutingModule {}
export const routingComponents = [JobPostComponent];
