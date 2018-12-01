import { Component, OnInit } from "@angular/core";
import { JobPostService } from "../../../service/job-post.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-showalljobs",
  templateUrl: "./showalljobs.component.html",
  styleUrls: ["./showalljobs.component.scss"]
})
export class ShowalljobsComponent implements OnInit {
  arrTable: any[] = [];
  arrPage: any[] = [];
  Datalength: number;
  pageno: number = 1;
  pagesize: number = 5;
  pagesearch: string = "";
  constructor(private jobpostService: JobPostService, private router: Router) {
    this.pagearray();
    this.getdata(this.pagesearch, this.pageno, this.pagesize);
  }

  ngOnInit() { }
  getdata(_search, _pno, _psize) {
    let obj = { search: _search, pageno: _pno, limit: _psize };
    this.jobpostService.pageData(obj).subscribe(data => {
      console.log("getdata");
      console.log(data);
      this.arrTable = data;
      console.log("arrtable");
      console.log(this.arrTable);
    });
  }

  pagearray() {
    this.jobpostService.getjob().subscribe(data => {
      console.log("datalength");
      console.log(data);

      this.Datalength = data;
      let totalpages = this.Datalength / this.pagesize;
      if (this.Datalength % this.pagesize > 0) totalpages++;
      for (let i = 1; i <= totalpages; i++) {
        this.arrPage.push(i);
      }
    });
  }

  search() {
    let obj = {
      search: this.pagesearch,
      limit: this.pagesize,
      pageno: this.pageno
    };
    this.jobpostService.pageData(obj).subscribe(data => {
      this.arrTable = data;
    });
  }
}
