import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevelopersComponent } from './developers.component';
import { DeveloperListComponent } from './components/developer-list/developer-list.component';
import { DeveloperDetailsComponent } from './components/developer-details/developer-details.component';

const routes: Routes = [
  { path: '', component: DevelopersComponent },
  { path: 'developer-list', component: DeveloperListComponent },
  { path: ':developerId', component: DeveloperDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevelopersRoutingModule { }
