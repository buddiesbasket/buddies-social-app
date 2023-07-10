import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevelopersRoutingModule } from './developers-routing.module';
import { DevelopersComponent } from './developers.component';
import { DeveloperListComponent } from './components/developer-list/developer-list.component';
import { DeveloperDetailsComponent } from './components/developer-details/developer-details.component';


@NgModule({
  declarations: [
    DevelopersComponent,
    DeveloperListComponent,
    DeveloperDetailsComponent
  ],
  imports: [
    CommonModule,
    DevelopersRoutingModule
  ]
})
export class DevelopersModule { }
