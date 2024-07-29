import { Routes } from '@angular/router';
import { Path } from '@app-enums';
import { JobsListComponent } from './features/jobs-list/jobs-list.component';

export const routes: Routes = [
  {
    path: Path.JobsList,
    component: JobsListComponent
  },
  {
    path: Path.WildCard,
    redirectTo: Path.JobsList,
    pathMatch: 'full'
  }
];
