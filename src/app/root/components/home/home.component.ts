import { Component } from '@angular/core';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private userService: UserService){}
  
  public isLoggedIn():boolean{
    return this.userService.isLoggedIn();
  }
}
