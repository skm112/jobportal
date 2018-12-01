import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApplyforjobService {

  constructor(private http: HttpClient) { }

  //@header
  headerFun() {
    let token = localStorage.getItem('token');
    // console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return httpOptions;
  }

  //@get records length
  getRecordLength(): Observable<any> {
    return this.http
      .get("http://localhost:3000/applyforjob/records")
      .pipe(map(response => response));
  };
  //@savedata 
  savedata(id: string, obj: any): Observable<any> {
    return this.http
      .post("http://localhost:3000/applyforjob/save/" + id, obj, this.headerFun())
      .pipe(map(response => response));
  };
  //---------------------------------------------------
  updatedata(obj: any): Observable<any> {
    return this.http
      .put("http://localhost:3000/applyforjob/update", obj)
      .pipe(map(response => response));
  }
  //---------------------------------------------------
  deletedata(obj: any): Observable<any> {
    return this.http
      .delete("http://localhost:3000/applyforjob/delete/" + obj._id)
      .pipe(map(response => response));
  }
  //--------------------------------------------------------
  getpagedata(obj: any): Observable<any> {
    console.log(obj);
    return this.http
      .post("http://localhost:3000/applyforjob/pageno/list", obj)
      .pipe(map(response => response));

  }


}
