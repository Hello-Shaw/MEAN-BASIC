import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  errorMsg='';
  message='';
  constructor(private _userService: UserService,
              private _router:Router) { }

  ngOnInit() {

  }

  submitted=false;

  userModel=new User('','','','');

  onSubmit(){
     //console.log();
    this.submitted = true;
    this._userService.toServer(this.userModel)
      .subscribe(

         res=>{
           // console.log(res);
         localStorage.setItem('token',res.token);
         this._router.navigate(['/gift'])

         },
        // data=>console.log('success',data),
        error=>this.errorMsg=error.statusText,
      )

  }
}
