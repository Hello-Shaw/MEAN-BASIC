import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Login } from "../models/login";
import {User} from "../models/user";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class loginService {
  _url = 'http://localhost:3000/register/login';
  constructor(private _http: HttpClient) { }

  toServer(login:Login){

    return this._http.post<any>(this._url,login)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error:HttpErrorResponse){

    return throwError(error);
  }





}
