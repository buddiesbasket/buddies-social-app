import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IProfile, ISocial } from '../../models/IProfile';
import { ProfileService } from '../../services/profile.service';
import { error } from 'jquery';
import { catchError, concatMap } from 'rxjs';
import { ErrorHandlerUtil } from 'src/app/errorHandlerUtil';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{

  @ViewChild('secondSection', { static: false }) secondSection: ElementRef;
  @Output() sectionContent = new EventEmitter<string>();
  // @Input() profileData: IProfile;
  // @Output() profileDataChange = new EventEmitter<any>();
  public profile: IProfile;
  public social: ISocial;
  public updateSocialToggler: boolean = false;
  public updateProfileToggler: boolean = false;
  public newSocial: ISocial = {
    facebook: '',
    youtube: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  }

  constructor(private profileService: ProfileService){}

  ngOnInit(): void {
    this.profileService.fetchProfileData().subscribe({
      next: (data) => {
      this.profile = data.profile
    },
      error: (error) => {
        catchError(ErrorHandlerUtil.handleError);
    }})
  }

  public ngAfterViewInit() {
    const sectionContent = this.secondSection.nativeElement.innerHTML;
    this.sectionContent.emit(sectionContent);
  }

  public submitEditProfileForm(){
    
    this.profileService.updateProfile(this.profile).subscribe({
      next: (data) =>{
        this.profile = data.profile
      },
      error: (error) => {
        catchError(ErrorHandlerUtil.handleError);
      }
    })
  }

  public submitEditSocial(){
    console.log('Sending data to server:', this.newSocial);
    this.profileService.updateSocial(this.newSocial).subscribe({
      next: (data) => {
        this.social = this.newSocial
    this.profile.social.unshift(this.newSocial);
      // Clear the form fields
      this.newSocial = {
        facebook: '',
        youtube: '',
        twitter: '',
        instagram: '',
        linkedin: ''
    }
    alert('Updated Successful');
  },
    error: (error) => {
      catchError(ErrorHandlerUtil.handleError);
    }
  });
  }

  public deleteSocialProfile(socialId: string){
    this.profileService.deleteSocial(socialId).subscribe({
      next:(data) => {
        this.profile = data.profile
      },
      error: (error) => {
        catchError(ErrorHandlerUtil.handleError);
      }
    });
  }

  public updateSocialProfile(){
    this.updateSocialToggler = !this.updateSocialToggler;
  }

  public updateProfile(){
    this.updateProfileToggler = !this.updateProfileToggler
  }

  public hasProfile(): boolean {
    return !!this.profile && Object.keys(this.profile).length > 0;
  }

  public hasSocial(): boolean {
    return !!this.profile.social && Object.keys(this.profile.social).length > 0;
  }

  // public emitProfileData() {
  //   this.profileDataChange.emit(this.profileData);
  // }
      
}


