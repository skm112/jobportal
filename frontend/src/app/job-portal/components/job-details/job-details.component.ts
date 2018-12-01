import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { JobPostService } from "../../../service/job-post.service";

@Component({
  selector: "app-job-details",
  templateUrl: "./job-details.component.html",
  styleUrls: ["./job-details.component.scss"]
})
export class JobDetailsComponent implements OnInit {
  arrTable: any[] = [];
  public job_id: string;
  public Jobtitle: string;
  constructor(
    private jobpostService: JobPostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.job_id = params["id"];
      this.Jobtitle = params["Jobtitle"];
      if (this.job_id) {
        this.getdata();
      }
    });
  }

  getdata() {
    let obj = { id: this.job_id };
    this.jobpostService.getshowjob(obj).subscribe(data => {
      this.arrTable = data;
      console.log("data");
      console.log(data);
    });
  }

  ngOnInit() {}
}
