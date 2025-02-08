import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service'; 
import { Movie } from '../../model/movie.model';
import { MovieResponse } from '../../model/movie-response.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  movies: Movie[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 10;

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies(this.currentPage, this.pageSize).subscribe((response: MovieResponse) => {
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

  viewDetails(movieId: number): void {
    console.log(movieId);
    this.router.navigate(['/movie-details', movieId]);
  }
  
  trackById(index: number, movie: any): number {
    return movie.id;
  }
}
