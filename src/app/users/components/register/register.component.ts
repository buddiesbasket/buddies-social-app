import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  public user ={
    name:'',
    email:'',
    password:''
  }
  public showPassword: boolean = false;

  constructor(private userService: UserService,
              private router: Router){}

  ngOnInit(): void {
      
  }

  public submitRegisterForm(){
    let {name, email, password} = this.user;
    if(name != '' && email != '' && password != ''){
       this.userService.registerUser(this.user);
       this.router.navigate(['/users/login']);
       alert('Registration Successful');
    }
    else{
      alert('Please fill all the fields');
    }  
  }

  public togglePassword(){
    this.showPassword=!this.showPassword;
  }

}
