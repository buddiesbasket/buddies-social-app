import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export class ErrorHandlerUtil{
    
    public static handleError(error:HttpErrorResponse){
        let errorMessage:string = '';
          if(error.error instanceof ErrorEvent){
            //client error
            errorMessage = `Error : ${error.error.message}`
        }
          else{
            //server error
            errorMessage = `Status : ${error.status} \n Message : ${error.message}`
          }
          return throwError(errorMessage);
      }
}