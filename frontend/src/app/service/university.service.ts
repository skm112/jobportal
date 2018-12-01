import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private http: HttpClient) { }

  //@getData
  getdata(): Observable<any> {
    return this.http
      .get("http://localhost:3000/university/list")
      .pipe(map(response => response));
  }

  //@saveData
  savedata(obj: any): Observable<any> {
    return this.http
      .post("http://localhost:3000/university/save", obj)
      .pipe(map(response => response));
  }

  //@updateData
  updatedata(obj: any): Observable<any> {
    return this.http
      .put("http://localhost:3000/university/update", obj)
      .pipe(map(response => response));
  }

  //@deleteData
  deletedata(obj: any): Observable<any> {
    return this.http
      .delete("http://localhost:3000/university/delete/" + obj._id, obj)
      .pipe(map(response => response));
  }

}
