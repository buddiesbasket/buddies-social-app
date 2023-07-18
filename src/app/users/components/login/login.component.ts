import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ErrorHandlerUtil } from 'src/app/errorHandlerUtil';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public user ={
    name:'',
    email:'',
    password:''
  }
  public showPassword: boolean = false;
  public isEmpty: boolean = false;
  public token: string;

  constructor(private userService: UserService,
              private router: Router){}

  ngOnInit(): void {
      
  }

  public togglePassword(){
    this.showPassword=!this.showPassword;
  }

  public submitLoginForm(){
    let {email, password} = this.user;
    if(email != '' && password != ''){
      this.userService.loginUser(this.user).pipe(
        catchError(ErrorHandlerUtil.handleError)
      ).subscribe({
        next: (response) => {
        localStorage.setItem('x-access-token', response.token);
        this.router.navigate(['/']);
      alert('Login Successful');
      this.isEmpty = false;
      }, 
      error: (error) => {
        ErrorHandlerUtil.handleError(error);
      }});
    }
    else{
      alert('Please fill all the fields');
      this.isEmpty = true;
    } 
  }
}
