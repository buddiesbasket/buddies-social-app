import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { IDeveloper } from '../models/IDeveloper';
import { environment } from 'environments/environment';
import { Observable, catchError } from 'rxjs';
import { ErrorHandlerUtil } from 'src/app/errorHandlerUtil';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService implements OnInit{

  public developers: IDeveloper[] | undefined = [] as IDeveloper[];
  public developer: IDeveloper;
  public loading: boolean = false;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
      
  }

  //get all profiles
  public getAllDevelopers():Observable<{developers:IDeveloper[]}>{
    let dataUrl = `${environment.apiUrl}/profiles/`
      return this.httpClient.get<{developers:IDeveloper[]}>(dataUrl).pipe(
        catchError(ErrorHandlerUtil.handleError)
      )
  }

  public getDeveloperById(developerId: string): Observable<IDeveloper> {
    const dataUrl = `${environment.apiUrl}/profiles/${developerId}`;
    return this.httpClient.get<IDeveloper>(dataUrl).pipe(
      catchError(ErrorHandlerUtil.handleError)
      );
  }
} 