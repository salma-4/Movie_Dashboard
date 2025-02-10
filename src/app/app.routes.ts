import { Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieDetailsComponent } from './components/user/movie-details/movie-details.component';
import { OmdbComponent } from './components/admin/omdb/omdb.component';
import { SearchedMovieComponent } from './components/admin/searched-movie/searched-movie.component';
import { AdminMovieComponent } from './components/admin/admin-movie/admin-movie.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { combineLatest } from 'rxjs';
import { RegisterationComponent } from './components/user/registeration/registeration.component';
import { AdminGuard } from './core/guards/admin.guard';
import { UserGuard } from './core/guards/user.guard';
import { LoginComponent } from './components/user/login/login.component';
export const routes: Routes = [
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  {path:'search-movie/:t',component:SearchedMovieComponent ,canActivate:[AdminGuard]},
  {path:'admin/movies/:i',component:AdminMovieComponent,canActivate:[AdminGuard]},
  {path:"admin/admin-dashboard/allMovies",component:OmdbComponent ,canActivate:[AdminGuard]},
  {path:"register",component:RegisterationComponent},
  {path:"login" ,component:LoginComponent},
  {path:"user-dashboard",component:UserDashboardComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] }, // Protected by AdminGuard
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/login' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule {}


