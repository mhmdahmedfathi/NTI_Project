import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg=""
  isSubmitted = false
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password:new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(20)])
  })
  get email(){return this.loginForm.get('email')}
  get password(){return this.loginForm.get('password')}
  constructor(private _auth:AuthService, private _router:Router) { }

  ngOnInit(): void {
  }

  login(){
    this.isSubmitted=true
    this.msg=""
    if(this.loginForm.valid){
      this._auth.login(this.loginForm.value).subscribe(
        (data)=>{
          console.log(data)
          localStorage.setItem("NTIProject", data.data.token)
        },
        (err)=>{
          this.msg="Unauthorized"
        },
        ()=>{
          this._auth.me().subscribe(
            user=>{
              this._auth.isLogin=true
              this._auth.user = user.data
              this._auth.isAdmin = user.data.role == "admin" ? true : false
            },
            (e)=>{
              this._auth.isLogin=false
              this._auth.user=null
            },
            ()=>{
              this._router.navigateByUrl("/home")
            }
          )
        }
      )
    }
  }
}
