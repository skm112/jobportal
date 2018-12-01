import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) { }

  //@login
  signin(obj: any): Observable<boolean> {
    return this.http.post<any>('http://localhost:3000/professional/signin', obj)
      .pipe(
        map(user => {
          console.log(user);

          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', user.token);
            localStorage.setItem('username', user.username);
          }

          return user;
        })
      );
  }

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


  //@profile
  getprofile(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/professional/profile", this.headerFun())
      .pipe(
        map(response => response)
      )
  }
  //@delete profile
  deletedata(obj): Observable<any> {
    return this.http
      .delete("http://localhost:3000/professional/delete/" + obj._id, this.headerFun())
      .pipe(map(response => response));
  }

  //@update profile
  updatedata(obj: any): Observable<any> {
    return this.http
      .put("http://localhost:3000/professional/update", obj, this.headerFun())
      .pipe(map(response => response));
  }


  //@resetpassword
  resetPass(obj: any): Observable<any> {
    return this.http.put("http://localhost:3000/professional/resetpass", obj, this.headerFun())
      .pipe(map(response => response))
  }


  //@logout
  logout() {

    // remove user from local storage to log user out
    //localStorage.removeItem('token');
    localStorage.clear();

  }

  //@save education details
  saveData(username: string, obj: any): Observable<any> {
    return this.http
      .put("http://localhost:3000/professional/save/education/" + username, { obj: obj })
      .pipe(map(response => response));
  }

  //@get education detail service
  getEduData(obj: any): Observable<any> {
    return this.http
      .get<any>("http://localhost:3000/professional/get/education/" + obj.username)
      .pipe(
        map(response => response)
      )
  }

  //@delete education detail
  deleteEduData(obj: any): Observable<any> {
    return this.http
      .delete("http://localhost:3000/professional/delete/education/" + obj.username + "/" + obj.id)
      .pipe(map(response => response));
  }
  //
  //@update education detail
  updateEduData(username: string, obj: any): Observable<any> {
    return this.http
      .put("http://localhost:3000/professional/update/education/" + username + "/" + obj._id, obj)
      .pipe(map(response => response));
  }
}
