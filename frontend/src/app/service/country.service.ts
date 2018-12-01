import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  //@get records length
  getRecordLength(): Observable<any> {
    return this.http
      .get("http://localhost:3000/country/records")
      .pipe(map(response => response));
  }
  //@savedata 
  savedata(obj: any): Observable<any> {
    return this.http
      .post("http://localhost:3000/country/save", obj)
      .pipe(map(response => response));
  }
  //---------------------------------------------------
  updatedata(obj: any): Observable<any> {
    return this.http
      .put("http://localhost:3000/country/update", obj)
      .pipe(map(response => response));
  }
  //---------------------------------------------------
  deletedata(obj: any): Observable<any> {
    return this.http
      .delete("http://localhost:3000/country/delete/" + obj._id, obj)
      .pipe(map(response => response));
  }
  //--------------------------------------------------------
  getpagedata(obj: any): Observable<any> {
    console.log(obj);
    return this.http
      .post("http://localhost:3000/country/pageno/list", obj)
      .pipe(map(response => response));

  }
}
