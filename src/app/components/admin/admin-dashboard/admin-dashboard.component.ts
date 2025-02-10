import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie.model';
import { MovieService } from '../../../core/services/adminmovie.service';
import { Route, Router } from '@angular/router';
import { MovieResponse } from '../../../model/movie-response.model';
import { OmdbService } from '../../../core/services/omdb.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss','../admin-navbar.component.css']
})
export class AdminDashboardComponent implements OnInit{
movies: Movie[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 10;
  constructor(private adminMovieService:MovieService,private router:Router ){}
ngOnInit(): void {
  this.loadMovies();
}

loadMovies(): void {
    this.adminMovieService.getAllMovies(this.currentPage, this.pageSize).subscribe((response: MovieResponse) => {
      this.movies = response.content;
      this.totalPages = response.totalPages;
    });
  
}
nextPage(): void {
  if (this.currentPage < this.totalPages - 1) {
    this.currentPage++;
    this.loadMovies();
  }
}

prevPage(): void {
  if (this.currentPage > 0) {
    this.currentPage--;
    this.loadMovies();
  }
}
deleteMovie(movieId: number): void {
  if (confirm('Are you sure you want to delete this movie?')) {
    this.adminMovieService.deleteMovie(movieId).subscribe({
      next: () => {
        console.log('Movie deleted successfully');
        alert('Movie deleted successfully');
        this.loadMovies();
      },
      error: (err) => {
        console.error('Error deleting movie:', err);
        alert('Failed to delete movie. Please try again.');
      }
    });
  }
}

trackById(index: number, movie: any): number {
  return movie.id;
}


}
