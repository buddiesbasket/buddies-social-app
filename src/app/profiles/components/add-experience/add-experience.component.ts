import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { IExperience, IProfile, ISocial } from '../../models/IProfile';
import { error } from 'jquery';
import { catchError } from 'rxjs';
import { ErrorHandlerUtil } from 'src/app/errorHandlerUtil';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent implements OnInit{

  @Input() profileData: IProfile;
  @Output() profileDataChange = new EventEmitter<any>();
  public profile: IProfile;
  public updateExpToggler: boolean = false;
  public newExperience: IExperience = {
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  };
  constructor(private profileService: ProfileService){}

  ngOnInit(): void {
    this.profileService.fetchProfileData().subscribe({
      next: (data) => {
      this.profile = data.profile
    },
      error: (error) => {
      console.error('Failed to fetch profile:', error);
    }})
  }

  public submitAddExperience(){
    //console.log('Sending data to server:', this.newExperience);
    this.profileService.addExperience(this.newExperience).subscribe({
      next: (data) => {
    this.profile.experience.unshift(this.newExperience);
      // Clear the form fields
      this.newExperience = {
      title: '',
      company: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: ''
    }
    alert('Updated Successful');
  },
    error: (error) => {
      catchError(ErrorHandlerUtil.handleError);
    }
  });
  }

  public hasProfile(): boolean {
    return !!this.profile && Object.keys(this.profile).length > 0;
  }

  public deleteExperience(expId: string){
    this.profileService.deleteExperience(expId).subscribe({
      next:(data) => {
        this.profile = data.profile
      },
      error: (error) => {
        catchError(ErrorHandlerUtil.handleError);
      }
    });
  }

  public updateExperience(){
    this.updateExpToggler = !this.updateExpToggler;
  }

  public emitProfileData() {
    this.profileDataChange.emit(this.profileData);
  }
}
