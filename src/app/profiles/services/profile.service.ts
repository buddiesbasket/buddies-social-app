import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEducation, IExperience, IProfile, ISocial } from '../models/IProfile';
import { Observable, catchError, retry } from 'rxjs';
import { environment } from 'environments/environment';
import { ErrorHandlerUtil } from 'src/app/errorHandlerUtil';
import { UserService } from 'src/app/users/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService{

  constructor(private httpClient: HttpClient,
              private userService: UserService) { }

  public fetchProfileData():Observable<{profile: IProfile}>{
    const dataUrl = `${environment.apiUrl}/profiles/me`;  
    const headers = new HttpHeaders().set('x-access-token', `${this.userService.getToken()}`);
    return this.httpClient.get<{profile: IProfile}>(dataUrl, { headers })
      .pipe(
        retry(1),
        catchError(ErrorHandlerUtil.handleError)
      );
  }

  public updateProfile(profile: IProfile):Observable<{profile: IProfile}>{
    const dataUrl = `${environment.apiUrl}/profiles/`;  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `${this.userService.getToken()}`
      })
    };
    return this.httpClient.put<{profile: IProfile}>(dataUrl, profile, httpOptions)
      .pipe(
        retry(1),
        catchError(ErrorHandlerUtil.handleError)
      );
  }

  public updateSocial(social: ISocial):Observable<{profile: IProfile}>{
    const dataUrl = `${environment.apiUrl}/profiles/social`;  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `${this.userService.getToken()}`
      })
    };
    return this.httpClient.post<{profile: IProfile}>(dataUrl, social, httpOptions)
      .pipe(
        retry(1),
        catchError(ErrorHandlerUtil.handleError)
      );
  }

  public deleteExperience(expId: string): Observable<{ result: string, profile: IProfile }> {
    const dataUrl = `${environment.apiUrl}/profiles/experience/${expId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `${this.userService.getToken()}` // Include the authentication token
      })
    };  
    return this.httpClient.delete<{ result: string, profile: IProfile }>(dataUrl, httpOptions)
      .pipe(
        catchError(ErrorHandlerUtil.handleError)
      );
  }
  

  public deleteEducaton(eduId: string){
    const dataUrl = `${environment.apiUrl}/profiles/education/${eduId}`;  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `${this.userService.getToken()}` 
      })
    };  
    return this.httpClient.delete<{result: string, profile: IProfile}>(dataUrl,  httpOptions )
      .pipe(
        retry(1),
        catchError(ErrorHandlerUtil.handleError)
      );
  }

  public deleteSocial(socialId: string): Observable<{ result: string, profile: IProfile }> {
    const dataUrl = `${environment.apiUrl}/profiles/social/${socialId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `${this.userService.getToken()}` // Include the authentication token
      })
    };  
    return this.httpClient.delete<{ result: string, profile: IProfile }>(dataUrl, httpOptions)
      .pipe(
        catchError(ErrorHandlerUtil.handleError)
      );
  }

  public addEducation(edu: IEducation):Observable<{profile: IProfile}>{
    const dataUrl = `${environment.apiUrl}/profiles/education`; 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `${this.userService.getToken()}`
      })
    };  
    return this.httpClient.post<{profile: IProfile}>(dataUrl, edu, httpOptions)
      .pipe(
        retry(1),
        catchError(ErrorHandlerUtil.handleError)
      );
  }

  public addExperience(exp: IExperience):Observable<{profile: IProfile}>{
    const dataUrl = `${environment.apiUrl}/profiles/experience`; 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `${this.userService.getToken()}`
      })
    };
    return this.httpClient.post<{profile: IProfile}>(dataUrl, exp, httpOptions)
      .pipe(
        retry(1),
        catchError(ErrorHandlerUtil.handleError)
      );
  }
}

