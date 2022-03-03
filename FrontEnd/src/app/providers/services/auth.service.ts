import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogin : boolean = false
  public user: any = null

  commonApiURL="http://localhost:3000/"
  constructor(private _http:HttpClient) { }

  register(data:any):Observable<any>{
    return this._http.post(`${this.commonApiURL}api/user/register`, data)
  }
  login(data:any):Observable<any>{
    console.log(data)
    return this._http.post(`${this.commonApiURL}api/user/login`, data)
  }
  me():Observable<any>{
    return this._http.get(`${this.commonApiURL}api/user/me`)
  }
  logout():Observable<any>{
    return this._http.post(`${this.commonApiURL}api/user/logout`, null)
  }
  GetProducts():Observable<any>{
    return this._http.get(`${this.commonApiURL}api/product`)
  }
  GetImage(ProductImage:string):Observable<any>{
    return this._http.get(`${this.commonApiURL}api/product/${ProductImage}`)
  }
}
