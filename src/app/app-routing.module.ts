import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';  // Import the fixed routing module
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { OmdbComponent } from './components/admin/omdb/omdb.component';
import { SearchedMovieComponent } from './components/admin/searched-movie/searched-movie.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    OmdbComponent,
    SearchedMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule
  ],
  bootstrap: [UserDashboardComponent] 
})

export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(solidStar);
  }
}
