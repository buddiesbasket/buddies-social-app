import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
import { Observable, catchError, retry } from 'rxjs';
import { ErrorHandlerUtil } from 'src/app/errorHandlerUtil';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  public registerUser(user: IUser):Observable<{msg: string}>{
    let dataUrl = `${environment.apiUrl}/users/register`;
    return this.httpClient.post<{msg: string}>(dataUrl, user).pipe(
      retry(1),
      catchError(ErrorHandlerUtil.handleError)
    )
  }

  public loginUser(user: IUser):Observable<{msg: string, token: string}>{
    let dataUrl = `${environment.apiUrl}/users/login`;
    return this.httpClient.post<{msg: string, token: string}>(dataUrl, user).pipe(
      retry(1),
      catchError(ErrorHandlerUtil.handleError)
    )
  }
  //get a user info
  public getUserInfo():Observable<{user: IUser}>{
    let dataUrl = `${environment.apiUrl}/users/`;
    return this.httpClient.get<{user: IUser}>(dataUrl).pipe(
      retry(1),
      catchError(ErrorHandlerUtil.handleError)
    )
  }

  //logout
  public logoutUser():void{
    localStorage.removeItem('x-access-token');
    this.router.navigate(['/users/login']);
    alert('Logout Successful');
  }

  //isloggedin
  public isLoggedIn():boolean{
    return !!localStorage.getItem('x-access-token');
  }

  //get token
  public getToken(){
    if(this.isLoggedIn()){
      return localStorage.getItem('x-access-token');
    }
    else{
      return 'No Token Available';
    }
  }
}
