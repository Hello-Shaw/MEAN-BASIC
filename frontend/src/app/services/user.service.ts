import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../models/user";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
   _url = 'http://localhost:3000/register';
  constructor(private _http: HttpClient,
              private _router:Router) { }

  toServer(user:User){

    return this._http.post<any>(this._url,user)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error:HttpErrorResponse){

    return throwError(error);
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/home'])
  }


}
