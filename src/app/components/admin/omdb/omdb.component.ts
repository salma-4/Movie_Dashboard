import { CommonModule} from '@angular/common';
import { OmdbSearchResponse } from '../../../model/omdbSearchResponse.model';
import { OmdbService } from '../../../core/services/omdb.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OmdbMovie } from '../../../model/omdb.model';

@Component({
  selector: 'app-omdb',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './omdb.component.html',
  styleUrl: './omdb.component.scss'
})

export class OmdbComponent implements OnInit{
  searchTerm = '';
  searchResults?: OmdbSearchResponse;
  currentPage = 1;
  totalPages = 0;
  isLoading = false;
  errorMessage = '';

  isDefaultView=true;
  movies: OmdbMovie[] = [];


  constructor(private omdbService: OmdbService,private router: Router ){}
  ngOnInit(): void {
    this.loadAllMovies();
  }
  
  // load without search term
  private loadAllMovies(): void {
    this.isLoading = true;
    this.isDefaultView = true;
    
    this.omdbService.getAllMovies(this.currentPage).subscribe({
      next: (response) => this.handleResponse(response),
      error: (err) => this.handleError(err)
    });
  }

  // Handle search with or without term
  searchMovies(): void {
    if (this.searchTerm.trim()) {
      this.isDefaultView = false;
      this.currentPage = 1;
      this.loadSearchedMovies();
    } else {
      this.loadAllMovies();
    }
  }

  // Load movies with search term
  private loadSearchedMovies(): void {
    this.isLoading = true;
    this.router.navigate(['/search-movie', this.searchTerm]);
  }

  private handleResponse(response: any): void {
    if (response.Response === 'True') {
      this.movies = response.Search;
      this.totalPages = Math.ceil(parseInt(response.totalResults) / 10);
    } else if(!this.isDefaultView) {
         this.movies =response;
    }else{
      this.movies = [];
      this.errorMessage = this.isDefaultView 
        ? 'Could not load movies' 
        : 'No results found';
    }
    this.isLoading = false;
  }

  private handleError(error: any): void {
    this.errorMessage = 'Error loading movies';
    this.isLoading = false;
    console.error(error);
  }


  // showDetails(imdbId: string): void {
  //   this.omdbService.getMovieDetails(imdbId)
  //     .subscribe(details => {
  //       // Handle movie details display
  //       console.log('Movie details:', details);
  //     });
  // }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.isDefaultView ? this.loadAllMovies() : this.loadSearchedMovies();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.isDefaultView ? this.loadAllMovies() : this.loadSearchedMovies();
    }
  }

  
}