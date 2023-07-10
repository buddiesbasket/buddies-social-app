import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/users/models/IUser';
import { UserService } from 'src/app/users/services/user.service';
import { IProfile } from '../../models/IProfile';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  
  public user: IUser;
  public profile: IProfile;
  public loading: boolean = false;

  constructor(private profileService: ProfileService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe({
      next: (data) => {
      this.user = data.user;
    },
      error: (error) => {
      console.error('Failed to fetch user data:', error);
    }});
    
    this.profileService.fetchProfileData().subscribe({
      next: (data) => {
        this.profile = data.profile;
      },
      error: (error) => {
        console.error('Failed to fetch profile data:', error);
      }
    });
  }

  public hasProfile():boolean{
    return Object.keys(this.profile).length > 0;
  }

  public isLoggedIn():boolean{
    return this.userService.isLoggedIn();
  }

  public clickDeleteExperience(expId){
    this.profileService.deleteExperience(expId);
  }

  public clickDeleteEducaton(eduId){
    this.profileService.deleteEducaton(eduId);
  }

}
