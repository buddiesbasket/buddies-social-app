import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/users/services/user.service';
import { IUser } from 'src/app/users/models/IUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  public user: IUser = {} as IUser;
  constructor(private userService: UserService){}

  ngOnInit(): void {
    
      
  }

  public hasUser():boolean{
    return Object.keys(this.user).length > 0;
  }

  public isLoggedIn():boolean{
    return this.userService.isLoggedIn();
  }

  public clickLogout(){
    this.userService.logoutUser();
  }
}
