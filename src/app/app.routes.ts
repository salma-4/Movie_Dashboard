import { Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
export const routes: Routes = [
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  { path: '**', redirectTo: 'user-dashboard' } // Redirect unknown paths

];

