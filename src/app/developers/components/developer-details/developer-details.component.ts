import { Component, OnInit } from '@angular/core';
import { IDeveloper } from '../../models/IDeveloper';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DeveloperService } from '../../services/developer.service';

@Component({
  selector: 'app-developer-details',
  templateUrl: './developer-details.component.html',
  styleUrls: ['./developer-details.component.css']
})
export class DeveloperDetailsComponent implements OnInit{

  public developerId: string;
  public developers: IDeveloper[];
  public developer: IDeveloper;
  public loading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private developerService: DeveloperService){}

  ngOnInit(): void {
    
    this.developerService.getAllDevelopers().subscribe(
      (data) => {
        this.developers = data.developers;
        this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
          this.developerId = param.get('developerId');
          this.findDeveloper();
        });
      },
      (error) => {
        console.error('Failed to fetch developers:', error);
      }
    );
  }

  public findDeveloper(): void {
    this.developer = this.developers.find(developer => developer.user._id === this.developerId);
  }

  // public findDeveloper(): void {
  //   const matchingDevelopers = this.developers.filter(developer => developer.user._id === this.developerId);
  //   this.developer = matchingDevelopers.length > 0 ? matchingDevelopers[0] : null;
  // }
  
  
  public hasDeveloper():boolean{
    return !!this.developer;
  }

}
