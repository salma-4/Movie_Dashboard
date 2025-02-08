import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { OmdbComponent } from './components/admin/omdb/omdb.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
const routes: Routes = [
  {
     path: 'user-dashboard', 
     component: UserDashboardComponent },
  {
    path:'admin-dashboard'
    ,component:OmdbComponent},
  // { path: '**', redirectTo: 'user-dashboard' } // Redirect unknown routes
];

@NgModule({
  declarations: [UserDashboardComponent,OmdbComponent],
  imports: [RouterModule.forRoot(routes), 
    HttpClientModule,CommonModule,FontAwesomeModule,BrowserModule,
    FormsModule],
  exports: [RouterModule,UserDashboardComponent,OmdbComponent]
})
export class AppRoutingModule {
  constructor(library: FaIconLibrary) {
    // Add icons you need
    library.addIcons(solidStar);
  }
}

