import { Component, OnInit } from '@angular/core';
import {Login} from "../../models/login";
import {loginService} from "../../services/login.service";
import {Router} from "@angular/router";
import  {UserService} from "../../services/user.service";






@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel=new Login("","");
  errorMsg='';

  constructor(private _loginService: loginService,
              private _router:Router,
              private _userService:UserService) { }

  ngOnInit() {
  }

  toLogin() {
    //  this._loginService.toServer(this.loginModel)
    //   .subscribe(
    //     res=>{
    //       // console.log(res);
    //       localStorage.setItem('token',res.token);
    //       this._router.navigate(['/gift'])
    //     },
    //   // data=>console.log('success',data),
    //   error=>{this.errorMsg=error.message
    //    // console.log(error)
  //}
      // )
    this._loginService.toServer(this.loginModel)
      .subscribe( res => {

        localStorage.setItem('token',res.token);
        this._router.navigate(['/gift'])
      },
        err => {
        this.errorMsg = err.error.message;
          console.log(err);
        }
        )


  }

}
