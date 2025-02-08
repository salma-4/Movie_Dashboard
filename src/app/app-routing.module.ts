import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

const routes: Routes = [
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: '**', redirectTo: 'user-dashboard' } // Redirect unknown routes
];

@NgModule({
  declarations: [UserDashboardComponent],
  imports: [RouterModule.forRoot(routes), HttpClientModule,CommonModule,FontAwesomeModule],
  exports: [RouterModule,UserDashboardComponent]
})
export class AppRoutingModule {
  constructor(library: FaIconLibrary) {
    // Add icons you need
    library.addIcons(solidStar);
  }
}

