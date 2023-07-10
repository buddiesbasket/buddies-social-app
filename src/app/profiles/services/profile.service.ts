import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProfile } from '../models/IProfile';
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

  public deleteExperience(expId):Observable<{result: string, profile: IProfile}>{
    const dataUrl = `${environment.apiUrl}/profiles/experience/${expId}`;  
    return this.httpClient.delete<{result: string, profile: IProfile}>(dataUrl)
      .pipe(
        retry(1),
        catchError(ErrorHandlerUtil.handleError)
      );
  }

  public deleteEducaton(eduId){
    const dataUrl = `${environment.apiUrl}/profiles/education/${eduId}`;  
    return this.httpClient.delete<{result: string, profile: IProfile}>(dataUrl)
      .pipe(
        retry(1),
        catchError(ErrorHandlerUtil.handleError)
      );
  }
}

