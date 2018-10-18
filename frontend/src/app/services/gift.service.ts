import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
 import {Gift} from '../models/gift';
 import {Friend} from "../models/friend";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs/index";
import {User} from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class GiftService {

  private  gifturl='http://localhost:3000/register/gift';
  private  deleteurl='http://localhost:3000/register/delete/';
  private  mailurl='http://localhost:3000/register/mail';
  constructor(private http:HttpClient) { }

  getGift(){
    return this.http.get<any>(this.gifturl)
      ;
  }

  addGift(Gift){
    return this.http.post<Gift>(this.gifturl,Gift)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error:HttpErrorResponse){

    return throwError(error);
  }

  deletegift(id) {
    return this
      .http
      .delete(`${this.deleteurl}${id}`);
  }

  addmail(Friend){
    return this.http.post<Friend>(this.mailurl,Friend)
      .pipe(catchError(this.errorHandler));
  }






}
