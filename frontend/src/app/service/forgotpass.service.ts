import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgotpassService {

  constructor(private http: HttpClient) { }


  sendData(obj: any): Observable<boolean> {
    return this.http.post<any>('http://localhost:3000/professional/forgot', obj)
      .pipe(
        map(res => res)
      );
  }

  resetData(obj: any): Observable<boolean> {
    return this.http.post<any>('http://localhost:3000/professional/reset_password', obj)
      .pipe(
        map(res => res)
      );
  }



}
