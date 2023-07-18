import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { IProfile } from '../../models/IProfile';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit{

  public profileData: IProfile = {} as IProfile;
  

  constructor(private profileService: ProfileService){}

  ngOnInit(): void {
      
  }

  public handleSectionContent(content: string) {
    console.log('Section content received in parent component:', content);
    // Do whatever you want with the section content in the parent component
  }

  public  updateProfileData(updatedData: IProfile) {
    this.profileData = updatedData;
  }
}
