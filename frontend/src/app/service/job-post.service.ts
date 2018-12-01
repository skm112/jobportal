import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class JobPostService {
  constructor(private http: HttpClient) { }

  //@services for JOBPOST------

  //@header
  headerFun() {
    let token = localStorage.getItem("token");
    // console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      })
    };
    return httpOptions;
  }

  //@save job
  //@use in jobpost comp.
  //---------------------------------------------------
  savejob(obj: any): Observable<any> {
    return this.http
      .post("http://localhost:3000/jobpost/save", obj, this.headerFun())
      .pipe(map(response => response));
  }

  //---------------------------------------------------
  getdetail(id: string): Observable<any> {
    return this.http
      .get("http://localhost:3000/jobpost/job/" + id)
      .pipe(map(response => response));
  }

  //@service used in showalljobs comp.
  //---------------------------------------------------
  getjob(): Observable<any> {
    return this.http
      .get("http://localhost:3000/jobpost/showall")
      .pipe(map(response => response));
  }

  //paging sevice in showalljobs
  pageData(obj: any): Observable<any> {
    console.log(obj);
    return this.http
      .post("http://localhost:3000/jobpost/pageno/showall", obj)
      .pipe(map(response => response));
  }

  //@sevices used in showjobs comp.
  //---------------------------------------------------
  Getjob(obj: any): Observable<any> {
    return this.http
      .get("http://localhost:3000/jobpost/get/" + obj.username)
      .pipe(map(response => response));
  }

  //---------------------------------------------------
  updatejob(obj: any): Observable<any> {
    return this.http
      .put(
        "http://localhost:3000/jobpost/update/" + obj._id,
        obj,
        this.headerFun()
      )
      .pipe(map(response => response));
  }

  //---------------------------------------------------
  deletejob(obj: any): Observable<any> {
    return this.http
      .delete("http://localhost:3000/jobpost/delete/" + obj._id, obj)
      .pipe(map(response => response));
  }

  //@service for jobdetails
  getshowjob(obj: any): Observable<any> {
    return this.http
      .get("http://localhost:3000/jobpost/list/" + obj.id)
      .pipe(map(response => response));
  }
}
