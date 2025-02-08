import { Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieDetailsComponent } from './components/user/movie-details/movie-details.component';
import { OmdbComponent } from './components/admin/omdb/omdb.component';
import { SearchedMovieComponent } from './components/admin/searched-movie/searched-movie.component';
export const routes: Routes = [
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  { path:'admin-dashboard',component:OmdbComponent},
  {path:'search-movie/:t',component:SearchedMovieComponent},
  { path: '**', redirectTo: 'user-dashboard' } // Redirect unknown paths

];

