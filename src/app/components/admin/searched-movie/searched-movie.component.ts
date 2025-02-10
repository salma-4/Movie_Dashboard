import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OmdbService } from '../../../core/services/omdb.service';
import { OmdbMovieDetails } from '../../../model/omdbDetails.model';
import { MovieService } from '../../../core/services/adminmovie.service';
import { MovieDetails } from '../../../model/movie-details.model';
@Component({
  selector: 'app-searched-movie',
  imports: [CommonModule],
  templateUrl: './searched-movie.component.html',
  styleUrl: './searched-movie.component.scss'
})
export  class SearchedMovieComponent implements OnInit {

  constructor(private adminMovieService :MovieService,private route: ActivatedRoute, private router:Router,private omdbService: OmdbService ){}
  
  movie:OmdbMovieDetails |undefined;
  currentPage = 1;

  ngOnInit(): void {
    this.showMovie();
  }
   
  showMovie():void{
    const searchItem = String(this.route.snapshot.paramMap.get('t'));
     this.omdbService.searchMovies(searchItem,this.currentPage)
      .subscribe({
        next:(movieDetails)=>{
          this.movie =movieDetails;
        },error: (err) => {
          console.error('No Movies found:', err);
          this.router.navigate(['/admin-dashboard']);

        }

      })
      }
      goBack():void{
          this.router.navigate(['admin/admin-dashboard/allMovies']);
        }
        
        addMovie(): void {
          if (this.movie) {
            const newMovieDetails: MovieDetails = {
              id: 0,
              imdbID: this.movie.imdbID,
              title: this.movie.Title,
              year: this.movie.Year,
              genre: this.movie.Genre,
              director: this.movie.Director,
              actors: this.movie.Actors,
              plot: this.movie.Plot,
              rated: this.movie.Rated,
              runtime: this.movie.Runtime,
              type: this.movie.Type,
              language: this.movie.Language,
              country: this.movie.Country,
              poster: this.movie.Poster,
              imdbRating: this.movie.imdbRating
            };
        
            this.adminMovieService.addMovie(newMovieDetails).subscribe({
              next: (response) => {
                console.log('Movie added successfully:', response);
                alert(response.message); 
                this.router.navigate(['/admin/admin-dashboard/allMovies']); 
              },
              error: (err) => {
                if (err.status === 409) {
                  alert('This movie has already been added before.');
                } else {
                  alert('Failed to add movie. Please try again.');
                }
              }
            });
          }
        }
  }



