  import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
  import { IEducation, IProfile } from '../../models/IProfile';
  import { ProfileService } from '../../services/profile.service';
  import { catchError } from 'rxjs';
  import { ErrorHandlerUtil } from 'src/app/errorHandlerUtil';

  @Component({
    selector: 'app-add-education',
    templateUrl: './add-education.component.html',
    styleUrls: ['./add-education.component.css']
  })
  export class AddEducationComponent implements OnInit{

    @Input() profileData: IProfile;
    @Output() profileDataChange = new EventEmitter<any>();
    public profile: IProfile;
    public updateEduToggler: boolean = false;
    public newEducation: IEducation = {
      school: '',
      degree: '',
      fieldofstudy: '',
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

    public submitAddEducation(){
      
      // console.log('Sending data to server:', this.newEducation);
        this.profileService.addEducation(this.newEducation).subscribe({
        next: (data) => {
        this.profile.education.unshift(this.newEducation);
        // Clear the form fields
        this.newEducation = {
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
      };
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

  public deleteEducation(eduId: string){
    this.profileService.deleteEducaton(eduId).subscribe({
      next:(data) => {
        this.profile = data.profile
      },
      error: (error) => {
        catchError(ErrorHandlerUtil.handleError);
      }
    });
  }

  public updateEducation(){
    this.updateEduToggler = !this.updateEduToggler;
  }

  public emitProfileData() {
    this.profileDataChange.emit(this.profileData);
  }
    
  }

  
