import { Component, OnInit } from '@angular/core';
import { IDeveloper } from '../../models/IDeveloper';
import { DeveloperService } from '../../services/developer.service';


@Component({
  selector: 'app-developer-list',
  templateUrl: './developer-list.component.html',
  styleUrls: ['./developer-list.component.css']
})
export class DeveloperListComponent implements OnInit{

  public developers: IDeveloper[] = [] as IDeveloper[];
  public loading: boolean = false;

  constructor(private developerService: DeveloperService){}

  ngOnInit() {
    this.developerService.getAllDevelopers().subscribe({
      next: (data) => {
      this.developers = data.developers
    },
      error: (error) => {
      console.error('Failed to fetch developers:', error);
    }})
  }
}
