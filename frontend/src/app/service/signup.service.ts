import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }


  //@save data 
  signup(obj: any): Observable<any> {
    return this.http
      .post("http://localhost:3000/professional/signup", obj)
      .pipe(map(response => response));
  }
}
