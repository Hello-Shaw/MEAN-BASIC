import { Component, OnInit } from '@angular/core';
import {GiftService} from "../../services/gift.service";
import {Router} from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';
import {User} from "../../models/user";

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {

  gift=[];
  errorMsg='';
  giftData={};


  constructor(private _giftService :GiftService,
              private _router:Router) { }

  ngOnInit() {
   this._giftService.getGift()
     .subscribe(
       data=>
       {
         // console.log(data);
         this.gift=data;
         // console.log(this.gift);
       },

       err => {
         if( err instanceof HttpErrorResponse ) {
           if (err.status === 401) {
             this._router.navigate(['/login'])
           }
         }
       }
     )
  }

  toServer(){
    this._giftService.addGift(this.giftData)
      .subscribe(data => {
          console.log('success',data);
          this.showlist();

        },
        error => {this.errorMsg=error.statusText
      }
      );

  }


  deleteGift(id) {
    this._giftService.deletegift(id)
      .subscribe(data => {
          console.log('success',data);
          this.showlist();

        },
        error => {this.errorMsg=error.statusText
        }


    );

  }

  showlist(){
    this._giftService.getGift()
      .subscribe(
        data=>
        {
          // console.log(data);
          this.gift=data;
          console.log(this.gift);
        },
        err=>console.log(err),
      )
  }




}
