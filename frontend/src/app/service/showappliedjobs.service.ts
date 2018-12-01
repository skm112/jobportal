import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShowappliedjobsService {

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


  //@get records 
  getdata(): Observable<any> {
    return this.http
      .get("http://localhost:3000/applyforjob/user", this.headerFun())
      .pipe(map(response => response));
  };



}
